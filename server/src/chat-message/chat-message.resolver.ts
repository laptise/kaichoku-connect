import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ChatMessage } from './chat-message';
import { ChatMessageService } from './chat-message.service';
import { NewChatMessageInput } from './dto/new-chat-message.input';

@Resolver()
export class ChatMessageResolver {
  constructor(private chatMessageService: ChatMessageService) {}

  @Mutation((returns) => ChatMessage)
  async addNewChatMessage(@Args('data') data: NewChatMessageInput) {
    return await this.chatMessageService.addNew(data);
  }
}
