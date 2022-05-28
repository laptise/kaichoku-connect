/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MajorCategoryMst,
  MakerMst,
  MinorCategoryMst,
  ProductMst,
  TradeRequest,
  TradeRequestImage,
  User,
} from '@entities';
import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { NewMakerMstInput } from 'src/maker-mst/dto/new-maker-mst.input';
import { NewMinorCategoryInput } from 'src/minor-category-mst/dto/new-minor-category.input';
import { NewProductMstInput } from 'src/product-mst/dto/new-product-mst.input';

@InputType()
export class NewTradeRequestInput implements TradeRequest {
  @Field(() => String, { nullable: false })
  ownerId: string;

  @Field(() => Number, { nullable: false })
  majorCategoryId: number;

  @Field(() => NewMinorCategoryInput, { nullable: false })
  minorCategory?: MinorCategoryMst;

  @Field(() => NewMakerMstInput, { nullable: false })
  maker?: MakerMst;

  @Field(() => NewProductMstInput, { nullable: false })
  product?: ProductMst;

  @MaxLength(40)
  @Field((type) => String)
  title: string;

  @MaxLength(2000)
  @Field((type) => String)
  content: string;
  @MaxLength(10)
  @Field((type) => String)
  targetCountryCode: string;

  status: never;
  id: number;
  minorCategoryId: number;
  makerId: number;
  productId: number;
  owner?: User;
  majorCategory?: MajorCategoryMst;
  images?: [TradeRequestImage];
  count: number;
  viewedTimes: number;

  createdAt = new Date();
}
