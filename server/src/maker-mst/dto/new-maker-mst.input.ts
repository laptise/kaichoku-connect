/* eslint-disable @typescript-eslint/no-unused-vars */
import { MajorCategoryMstEntity, MakerMst } from '@entities';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewMakerMstInput implements MakerMst {
  @Field((type) => Number, { nullable: true })
  id: number;
  @Field((type) => String, { nullable: false })
  name: string;
  @Field(() => Number, { nullable: true })
  isVerificated: number;
}
