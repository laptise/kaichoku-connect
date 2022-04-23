import { MajorCategoryMstEntity } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'MAJOR_CATEGORY_MST' })
@ObjectType()
export class MajorCategoryMst
  extends BaseEntity
  implements MajorCategoryMstEntity
{
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  @Field((type) => ID)
  id: number;

  @PrimaryColumn({ name: 'NAME', type: 'varchar', length: 20 })
  @Field()
  name: string;
}
