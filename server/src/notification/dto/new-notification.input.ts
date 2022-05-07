/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotificationEntity, TradeRequestCommentEntity } from '@entities';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewNotificationInput implements NotificationEntity {
  @Field(() => String, { nullable: false })
  targetUserId?: string;
  @Field(() => String, { nullable: false })
  msg: string;
  id: number;
  createdAt: Date;
}
