/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TradeRequest as TradeRequestType,
  TradeRequestStatus,
} from '@entities';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**取引状態ENUM */
export enum TradeRequestStatusEnum {
  opened = 'opened',
  pending = 'pening',
  deleted = 'deleted',
  expired = 'expired',
  catched = 'catched',
}

registerEnumType(TradeRequestStatusEnum, { name: 'TradeRequestStatus' });

/**利用者 Entity */
@Entity({ name: 'tradeRequest' })
@ObjectType()
export class TradeRequest implements TradeRequestType {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field((type) => Int)
  id: number;

  @Column({ type: 'varchar', length: 40 })
  @Field()
  title: string;

  @Column({ type: 'varchar', length: 2000 })
  @Field()
  content: string;

  @Column({ type: 'int' })
  @Field()
  majorCategoryId: number;

  @Column({ type: 'int' })
  @Field()
  minorCategoryId: number;

  @Column('int')
  @Field()
  makerId: number;

  @Column('int')
  @Field()
  productId: number;

  @Field(() => TradeRequestStatusEnum)
  @Column({ type: 'varchar', nullable: false, default: 'pending' })
  status: TradeRequestStatus;

  @Index()
  @Field()
  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @Column({ type: 'varchar', length: 20 })
  ownerId: string;

  @Field()
  @Column({ type: 'int', default: 1 })
  count: number;

  @Field()
  @Column({ type: 'bigint', default: 0 })
  viewedTimes: number;

  @Field()
  @Column({ type: 'varchar', default: 'kor' })
  targetCountryCode: string;
}
