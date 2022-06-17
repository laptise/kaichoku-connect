/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { UserAddressInfo as Interface } from '@entities';

@InputType()
export class UpsertUserAddressInput {
  @Field((type) => String)
  ctx1: string;
  @Field((type) => String, { nullable: true })
  ctx2: string;
  @Field((type) => String, { nullable: true })
  ctx3: string;
  @Field((type) => String, { nullable: true })
  ctx4: string;
  @Field((type) => String, { nullable: true })
  ctx5: string;
  @Field((type) => String, { nullable: true })
  ctx6: string;
  @Field((type) => String, { nullable: true })
  ctx7: string;
  @Field((type) => String, { nullable: true })
  ctx8: string;
  @Field((type) => String, { nullable: true })
  ctx9: string;
  @Field((type) => String)
  zipCode: string;
  @Field((type) => String)
  countryCode: string;
}
