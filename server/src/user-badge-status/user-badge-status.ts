import { UserBadgeStatus as UserBadgeStatusType } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserBadgeMst } from 'src/user-badge-mst/user-badge-mst';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**利用者 Entity */
@Entity('userBadgeStatus')
@ObjectType()
export class UserBadgeStatus extends BaseEntity implements UserBadgeStatusType {
  @PrimaryColumn({ type: 'int' })
  @Field()
  badgeId: number;

  @PrimaryColumn({ type: 'varchar', length: 20 })
  @Field()
  ownerId: string;

  @Column({ type: 'timestamp' })
  @Field()
  gotAt: Date;

  @Column({ type: 'int' })
  @Field()
  isUsing: number;

  @Field((type) => UserBadgeMst)
  badgeInfo?: UserBadgeMst;
}
