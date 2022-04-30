/* eslint-disable @typescript-eslint/no-unused-vars */
import { TradeRequestImageEntity } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**利用者 Entity */
@Entity('tradeRequestImage')
@ObjectType()
export class TradeRequestImage
  extends BaseEntity
  implements TradeRequestImageEntity
{
  @PrimaryColumn({ type: 'int' })
  @Field((type) => ID)
  id: number;
  @Column({ type: 'varchar', length: 400 })
  @Field()
  url: string;
  @Column({ type: 'varchar', length: 80 })
  @Field()
  title: string;
  @Column({ type: 'varchar', length: 200 })
  @Field()
  content: string;
}
