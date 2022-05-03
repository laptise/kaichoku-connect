import { MajorCategoryMstEntity } from '@entities';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'majorCategoryMst' })
@ObjectType()
export class MajorCategoryMst
  extends BaseEntity
  implements MajorCategoryMstEntity
{
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field((type) => Int)
  id: number;

  @PrimaryColumn({ type: 'varchar', length: 20 })
  @Field()
  name: string;
}
