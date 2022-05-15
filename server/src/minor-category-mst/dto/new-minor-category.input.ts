/* eslint-disable @typescript-eslint/no-unused-vars */
import { MajorCategoryMstEntity, MinorCategoryMst } from '@entities';
import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewMinorCategoryInput implements MinorCategoryMst {
  @Field((type) => Number, { nullable: true })
  id: number;
  @Field((type) => Number, { nullable: false })
  majorId: number;
  @Field((type) => String, { nullable: false })
  name: string;
}
