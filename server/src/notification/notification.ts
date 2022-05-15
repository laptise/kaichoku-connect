/* eslint-disable @typescript-eslint/no-unused-vars */
import { Notification as NotificationType } from '@entities';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**通知*/
@Entity({ name: 'notification' })
@ObjectType()
export class Notification extends BaseEntity implements NotificationType {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field((type) => Int)
  id: number;

  @Column('varchar')
  @Field((type) => String)
  msg: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  @Field((type) => Date)
  createdAt: Date;

  @Column({ type: 'varchar', nullable: false, default: '' })
  @Field(() => String, { nullable: false })
  createdBy: string;

  @Column({ type: 'varchar', nullable: true })
  @Field((type) => String, { nullable: true })
  targetUserId?: string;
}
