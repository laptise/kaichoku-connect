/* eslint-disable @typescript-eslint/no-unused-vars */
import { Trade as TradeEntity, WithPagination } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from 'src/common';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**取引 Entity */
@Entity({ name: 'trade' })
@ObjectType()
export class Trade extends BaseEntity implements TradeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Number, { nullable: false })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  @Field(() => Number, { nullable: false })
  tradeRequestId: number;

  @Column({ type: 'bigint', nullable: false })
  @Field(() => Number, { nullable: false })
  requestCatchId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  createdAt: Date;
}

/**取引＆ページネーション */
@ObjectType()
export class TradesWithPagination implements WithPagination<Trade> {
  @Field(() => [Trade])
  nodes: Trade[];
  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
