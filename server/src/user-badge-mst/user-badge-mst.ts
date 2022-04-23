/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserBadgeMstEntity, UserEntity } from '@entities';
import { TradeRequest } from 'src/trade-request/trade-request';

/**利用者 Entity */
@Entity({ name: 'USER_BADGE_MST' })
@ObjectType()
export class UserBadgeMst extends BaseEntity implements UserBadgeMstEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  @Field((type) => ID)
  id: number;
  @Column({ name: 'NAME', type: 'varchar', length: 40 })
  @Field()
  name: string;
  @Column({ name: 'NOTE', type: 'varchar', length: 120, nullable: true })
  @Field((type) => String, { nullable: true })
  note: string;
  @Column({ name: 'CONTENT', type: 'varchar', length: 400, nullable: true })
  @Field((type) => String, { nullable: true })
  content: string;
}
