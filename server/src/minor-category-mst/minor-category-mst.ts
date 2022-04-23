import { MinorCategoryMstEntity } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'MINOR_CATEGORY_MST' })
@ObjectType()
export class MinorCategoryMst
  extends BaseEntity
  implements MinorCategoryMstEntity
{
  @PrimaryColumn({ name: 'ID', type: 'int' })
  @Field()
  id: number;

  @PrimaryColumn({ name: 'MAJOR_ID', type: 'int' })
  @Field()
  majorId: number;

  @Column({ name: 'NAME', type: 'varchar', length: 20 })
  @Field()
  name: string;
}
