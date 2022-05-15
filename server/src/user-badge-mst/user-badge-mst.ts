/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserBadgeMst as UserBadgeMstType } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'userBadgeMst' })
@ObjectType()
export class UserBadgeMst extends BaseEntity implements UserBadgeMstType {
  @PrimaryGeneratedColumn()
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
