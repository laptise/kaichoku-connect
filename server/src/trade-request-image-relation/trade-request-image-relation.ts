/* eslint-disable @typescript-eslint/no-unused-vars */
import { TradeRequestImageRelationEntity } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'TRADE_REQUEST_IMAGE_RELATION' })
@ObjectType()
export class TradeRequestImageRelation
  extends BaseEntity
  implements TradeRequestImageRelationEntity
{
  @PrimaryColumn({ name: 'TRADE_REQUEST_ID', type: 'int' })
  @Field((type) => ID)
  tradeRequestId: number;
  @PrimaryColumn({ name: 'TRADE_REQUEST_IMAGE_ID', type: 'int' })
  @Field((type) => ID)
  tradeRequestImageId: number;
}
