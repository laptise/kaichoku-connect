/* eslint-disable @typescript-eslint/no-unused-vars */
import { User as UserType } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TradeRequest } from 'src/trade-request/trade-request';
import { UserBadgeStatus } from 'src/user-badge-status/user-badge-status';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'user' })
@ObjectType()
export class User extends BaseEntity implements UserType {
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

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  imgUrl: string;

  @Field((type) => [TradeRequest])
  owner?: [TradeRequest];

  @Field((type) => [UserBadgeStatus])
  usingBadges?: [UserBadgeStatus];
}
