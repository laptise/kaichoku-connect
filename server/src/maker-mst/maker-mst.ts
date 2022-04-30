/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MakerMstEntity, UserBadgeMstEntity, UserEntity } from '@entities';
import { TradeRequest } from 'src/trade-request/trade-request';

/**利用者 Entity */
@Entity({ name: 'makerMst' })
@ObjectType()
export class MakerMst extends BaseEntity implements MakerMstEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;
  @Column({ type: 'varchar', length: 40 })
  @Field()
  name: string;
}
