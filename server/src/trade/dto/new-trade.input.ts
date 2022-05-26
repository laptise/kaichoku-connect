/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTradeInput {
  @Field((type) => String, { nullable: true, defaultValue: null })
  catcherId: string;

  @Field(() => Number, { nullable: false })
  tradeRequestId: number;

  @Field((type) => String, { nullable: false })
  ownerId: string;
}
