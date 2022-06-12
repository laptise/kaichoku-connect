import { Field, ObjectType } from '@nestjs/graphql';
import { BankInfo as BankType } from '@entities';

@ObjectType()
export class BankInfo implements BankType {
  @Field(() => String)
  swiftCode: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  imgUrl: string;
  @Field(() => Number)
  isBranchNeeded: number;
  @Field(() => Number)
  isAccountTypeNeeded: number;
}
