/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewTradeRequestInput {
  @MaxLength(40)
  @Field((type) => String)
  title: string;

  @MaxLength(2000)
  @Field((type) => String)
  content: string;

  createdAt = new Date();
}
