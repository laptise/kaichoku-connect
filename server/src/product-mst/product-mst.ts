/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductMstEntity } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'productMst' })
@ObjectType()
export class ProductMst extends BaseEntity implements ProductMstEntity {
  @PrimaryColumn()
  @Field()
  makerId: number;
  @PrimaryColumn()
  @Field()
  id: number;
  @Column({ type: 'varchar', length: 40 })
  @Field()
  name: string;
}
