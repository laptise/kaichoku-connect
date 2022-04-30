/* eslint-disable @typescript-eslint/no-unused-vars */
import { MakerMstEntity } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({ type: 'int', default: 0 })
  @Field()
  isVerificated: number;
}