/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserBadgeMstEntity, UserEntity } from '@entities';
import { TradeRequest } from 'src/trade-request/trade-request';

/**利用者 Entity */
@Entity({ name: 'USER_BADGE_MST' })
@ObjectType()
export class UserBadgeMst extends BaseEntity implements UserBadgeMstEntity {
  @PrimaryColumn({ name: 'ID', type: 'varchar', length: 20 })
  @Field((type) => ID)
  id: number;
  @Column({ name: 'NAME', type: 'varchar', length: 40 })
  @Field()
  name: string;
  @Column({ name: 'NOTE', type: 'varchar', length: 120 })
  @Field()
  note: string;
  @Column({ name: 'CONTENT', type: 'varchar', length: 400 })
  @Field()
  content: string;
}
