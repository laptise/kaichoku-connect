/* eslint-disable @typescript-eslint/no-unused-vars */
import { MakerMst as MakerMstType } from '@entities';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'makerMst' })
@ObjectType()
export class MakerMst extends BaseEntity implements MakerMstType {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;
  @Column({ type: 'varchar', length: 40 })
  @Field()
  name: string;
  @Column({ type: 'int', default: 0 })
  @Field()
  isVerificated: number;
}
