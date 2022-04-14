import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, MaxLength, Min } from 'class-validator';

@InputType()
export class UserInput {
  @MaxLength(40)
  @Field((type) => [String])
  email: string;

  @Field((type) => [String])
  displayName: string;
}
