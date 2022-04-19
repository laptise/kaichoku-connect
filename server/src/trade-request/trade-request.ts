import { TradeRequestEntity } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'TRADE_REQUEST' })
@ObjectType()
export class TradeRequest extends BaseEntity implements TradeRequestEntity {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  @Field((type) => ID)
  id: number;

  @Column({ name: 'TITLE', type: 'varchar', length: 40 })
  @Field()
  title: string;

  @Column({ name: 'CONTENT', type: 'varchar', length: 2000 })
  @Field()
  content: string;

  @Column({ name: 'OWNER_ID', type: 'bigint', nullable: false })
  @Field()
  ownerId: number;

  @Column({ name: 'CREATED_AT', type: 'date' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tradeRequests)
  owner: User;
}
