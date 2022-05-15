/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TradeRequestCatch as TradeRequestCatchType } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'tradeRequestCatch' })
@ObjectType()
export class TradeRequestCatch
  extends BaseEntity
  implements TradeRequestCatchType
{
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Column(() => Number)
  id: number;

  @Column('bigint')
  @Field(() => Number)
  tradeRequestId: number;

  @Column('varchar')
  @Field(() => String)
  catcherId: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  @Field((type) => Date)
  createdAt: Date;

  @Column('varchar')
  @Field(() => String)
  msg: string;
}
