import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, MaxLength, Min } from 'class-validator';

@InputType()
export class NewTestInput {
  @Field((type) => Int)
  @Min(0)
  @Max(9999)
  id: number;

  @Field((type) => [String])
  value: string;
}
