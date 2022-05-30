/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetChatMessageInput {
  @Field(() => Number)
  roomId: number;
  @Field(() => Number, { nullable: true, defaultValue: 20 })
  take: number;
}
