import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Test {
  @Field((type) => ID)
  id: number;
  @Field()
  value: string;
}
