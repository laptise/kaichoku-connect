/* eslint-disable @typescript-eslint/no-unused-vars */
import { TradeRequestEntity } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'TRADE_REQUEST' })
@ObjectType()
export class TradeRequest implements TradeRequestEntity {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  @Field((type) => ID)
  id: number;

  @Column({ name: 'TITLE', type: 'varchar', length: 40 })
  @Field()
  title: string;

  @Column({ name: 'CONTENT', type: 'varchar', length: 2000 })
  @Field()
  content: string;

  @Column({ name: 'MAJOR_CATEGORY_ID', type: 'int' })
  @Field()
  majorCategoryId: number;

  @Column({ name: 'MINOR_CATEGORY_ID', type: 'int' })
  @Field()
  minorCategoryId: number;

  @Index()
  @Field()
  @Column({ name: 'CREATED_AT', type: 'timestamp' })
  createdAt: Date;

  @Field()
  @Column({ name: 'OWNER_ID', type: 'varchar', length: 20 })
  ownerId: string;

  @Field()
  @Column({ name: 'COUNT', type: 'int', default: 1 })
  count: number;
}
