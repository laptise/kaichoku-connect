import { UserBadgeStatusEntity } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'USER_BADGE_STATUS' })
@ObjectType()
export class UserBadgeStatus
  extends BaseEntity
  implements UserBadgeStatusEntity
{
  @PrimaryColumn({ name: 'BADGE_ID', type: 'int' })
  @Field()
  badgeId: number;
  @PrimaryColumn({ name: 'OWNER_ID', type: 'varchar', length: 20 })
  @Field()
  ownerId: string;
  @Column({ name: 'GOT_AT', type: 'date' })
  @Field()
  gotAt: Date;
  @Column({ name: 'IS_USING', type: 'int' })
  @Field()
  isUsing: number;
}