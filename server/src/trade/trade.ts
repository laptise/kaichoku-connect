/* eslint-disable @typescript-eslint/no-unused-vars */
import { Trade } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'trade' })
@ObjectType()
export class TradeEntity extends BaseEntity implements Trade {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Number, { nullable: false })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  @Field(() => Number, { nullable: false })
  tradeRequestId: number;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  ownerId: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  catcherId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  createdAt: Date;
}
