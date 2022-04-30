/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserBadgeMstEntity, UserEntity } from '@entities';
import { TradeRequest } from 'src/trade-request/trade-request';

/**利用者 Entity */
@Entity({ name: 'userBadgeMst' })
@ObjectType()
export class UserBadgeMst extends BaseEntity implements UserBadgeMstEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  @Field((type) => ID)
  id: number;
  @Column({ type: 'varchar', length: 40 })
  @Field()
  name: string;
  @Column({ type: 'varchar', length: 120, nullable: true })
  @Field((type) => String, { nullable: true })
  note: string;
  @Column({ type: 'varchar', length: 400, nullable: true })
  @Field((type) => String, { nullable: true })
  content: string;
}
