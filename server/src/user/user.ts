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
import { UserEntity } from '@entities';
import { TradeRequest } from 'src/trade-request/trade-request';
import { UserBadgeStatus } from 'src/user-badge-status/user-badge-status';

/**利用者 Entity */
@Entity({ name: 'user' })
@ObjectType()
export class User extends BaseEntity implements UserEntity {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  @Field((type) => ID)
  id: string;

  @Column({ unique: true, type: 'varchar', length: 40 })
  @Field()
  email: string;

  /**ニックネーム */
  @Column({ type: 'varchar', length: 20 })
  @Field()
  displayName: string;

  /**ハッシュパスワード */
  @Column({ type: 'varchar', length: 256 })
  @Field()
  password: string;

  @Field((type) => [TradeRequest])
  owner?: [TradeRequest];

  @Field((type) => [UserBadgeStatus])
  usingBadges?: [UserBadgeStatus];
}
