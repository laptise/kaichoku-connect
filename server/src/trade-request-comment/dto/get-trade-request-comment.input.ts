import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetTradeRequestCommentInput {
  @Field(() => Number, { nullable: false })
  requestId: number;
  @Field(() => Number, { nullable: true })
  take: number;
  @Field(() => Number, { nullable: true })
  skip: number;
}
