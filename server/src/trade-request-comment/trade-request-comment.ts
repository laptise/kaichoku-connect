/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotificationEntity, TradeRequestCommentEntity } from '@entities';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**通知*/
@Entity({ name: 'tradeRequestComment' })
@ObjectType()
export class TradeRequestComment
  extends BaseEntity
  implements TradeRequestCommentEntity
{
  @Column({ type: 'bigint' })
  @Field(() => Int)
  tradeRequestId: number;

  @Column('varchar')
  @Field(() => String, { nullable: false })
  content: string;

  @Column({ type: 'int', nullable: true })
  @Field(() => Int, { nullable: true })
  repliesTo?: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  isSecret: number;

  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field((type) => Int)
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field((type) => Date)
  updatedAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  @Field((type) => Date)
  createdAt: Date;
}
