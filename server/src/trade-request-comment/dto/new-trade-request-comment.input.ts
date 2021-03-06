/* eslint-disable @typescript-eslint/no-unused-vars */
import { TradeRequestComment } from '@entities';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTradeRequestCommentInput implements TradeRequestComment {
  @Field(() => Number, { nullable: false })
  tradeRequestId: number;
  @Field(() => String, { nullable: false })
  content: string;
  id: number;
  createdBy: string;
  isSecret: number;
  repliesTo?: number;
  createdAt: Date;
  updatedAt: Date;
}
