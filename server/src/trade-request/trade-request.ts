/* eslint-disable @typescript-eslint/no-unused-vars */
import { TradeRequestEntity } from '@entities';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'tradeRequest' })
@ObjectType()
export class TradeRequest implements TradeRequestEntity {
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
