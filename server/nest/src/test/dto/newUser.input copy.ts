/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql';
import { Length, Max, MaxLength, Min } from 'class-validator';

@InputType()
export class UserInput {
  @MaxLength(40)
  @Field((type) => String)
  email: string;

  @Field((type) => String)
  displayName: string;

  @Length(64)
  @Field((type) => String)
  password: string;
}
