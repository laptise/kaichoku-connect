/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewNotificationInput {
  @Field(() => String, { nullable: false })
  targetUserId?: string;
  @Field(() => String, { nullable: false })
  msg: string;
  @Field(() => String, { nullable: true })
  actionLink?: string;
}
