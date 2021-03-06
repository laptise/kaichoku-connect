/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTradeRequestCatchInput {
  @Field((type) => String, { nullable: true, defaultValue: null })
  catcherId: string;

  @Field((type) => String, { nullable: false })
  msg: string;

  @Field(() => Number, { nullable: false })
  tradeRequestId: number;
}
