/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TradeRequestCatch } from '@entities';
import { ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'tradeRequestCatch' })
@ObjectType()
export class TradeRequestCatchEntity
  extends BaseEntity
  implements TradeRequestCatch
{
  tradeRequestId: number;
  catcherId: string;
  createdAt: Date;
  msg: string;
}
