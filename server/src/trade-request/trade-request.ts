import { TradeRequestEntity } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Index()
  @Field()
  @Column({ name: 'CREATED_AT', type: 'timestamp' })
  createdAt: Date;

  @Field()
  @Column({ name: 'OWNER_ID', type: 'bigint' })
  ownerId: number;
}
