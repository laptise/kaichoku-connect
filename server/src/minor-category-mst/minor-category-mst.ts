import { MinorCategoryMstEntity } from '@entities';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'minorCategoryMst' })
@ObjectType()
export class MinorCategoryMst
  extends BaseEntity
  implements MinorCategoryMstEntity
{
  @PrimaryColumn({ type: 'int' })
  @Field(() => Int)
  id: number;

  @PrimaryColumn({ type: 'int' })
  @Field()
  majorId: number;

  @Column({ type: 'varchar', length: 20 })
  @Field()
  name: string;
}
