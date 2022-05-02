/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductMstEntity } from '@entities';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewProductMstInput implements ProductMstEntity {
  @Field((type) => Number, { nullable: true })
  makerId: number;
  @Field((type) => Number, { nullable: false })
  id: number;
  @Field((type) => String, { nullable: false })
  name: string;
  @Field((type) => Number, { nullable: true })
  isVerificated: number;
}
