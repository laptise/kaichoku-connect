/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBankInfoInput {
  @Field(() => String, { nullable: false })
  swiftCode: string;
  @Field(() => String, { nullable: false })
  accountNo: string;
  @Field(() => String, { nullable: true })
  accountType: string;
  @Field(() => String, { nullable: true })
  branchCode: string;
}
