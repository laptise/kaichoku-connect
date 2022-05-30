import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { ChatMessage } from './chat-message';
import { ChatMessageService } from './chat-message.service';
import { GetChatMessageInput } from './dto/get-chat-message.input';
import { NewChatMessageInput } from './dto/new-chat-message.input';

const ChatPubsub = new PubSub();

@Resolver()
export class ChatMessageResolver {
  constructor(private chatMessageService: ChatMessageService) {}

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Mutation((returns) => ChatMessage)
  async addNewChatMessage(
    @Args('data') data: NewChatMessageInput,
    @CurrentUser() user: JWTPayload,
  ) {
    const newMessage = await this.chatMessageService.addNew({
      ...data,
      createdBy: user.userId,
    });
    await ChatPubsub.publish('newMessage', { newMessage });
    return newMessage;
  }

  @Query((returns) => [ChatMessage])
  async getChatMessages(@Args('condition') condition: GetChatMessageInput) {
    return await this.chatMessageService.getByCondition(condition);
  }

  @Subscription((returns) => ChatMessage, {
    filter: (payload, variables) =>
      payload.newMessage.roomId === variables.roomId,
  })
  newMessage(@Args('roomId') roomId: number) {
    return ChatPubsub.asyncIterator('newMessage');
  }
}
