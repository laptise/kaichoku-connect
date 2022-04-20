/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class GetTradeRequestInput {
  @Field((type) => Number, { nullable: true })
  limit: number;
}
