/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatMessageType } from '@entities';
import { Field, InputType } from '@nestjs/graphql';
import { ChatMessageEnum } from '../chat-message';

@InputType()
export class NewChatMessageInput {
  @Field(() => Number)
  roomId: number;
  @Field(() => String)
  content: string;
  @Field(() => ChatMessageEnum)
  type: ChatMessageType;
  @Field(() => String, { nullable: true })
  createdBy: string;
}
