/* eslint-disable @typescript-eslint/no-unused-vars */
import { TradeRequestImageRelation as TradeRequestImageRelationType } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'tradeRequestImageRelation' })
@ObjectType()
export class TradeRequestImageRelation
  extends BaseEntity
  implements TradeRequestImageRelationType
{
  @PrimaryColumn({ type: 'int' })
  @Field((type) => ID)
  tradeRequestId: number;
  @PrimaryColumn({ type: 'int' })
  @Field((type) => ID)
  tradeRequestImageId: number;
}
