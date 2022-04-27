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
@Entity({ name: 'TRADE_REQUEST_IMAGE' })
@ObjectType()
export class TradeRequestImage
  extends BaseEntity
  implements TradeRequestImageEntity
{
  @PrimaryColumn({ name: 'ID', type: 'int' })
  @Field((type) => ID)
  id: number;
  @Column({ name: 'URL', type: 'varchar', length: 400 })
  @Field()
  url: string;
  @Column({ name: 'TITLE', type: 'varchar', length: 80 })
  @Field()
  title: string;
  @Column({ name: 'CONTENT', type: 'varchar', length: 200 })
  @Field()
  content: string;
}
