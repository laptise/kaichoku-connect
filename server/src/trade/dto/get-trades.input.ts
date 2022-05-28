import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum UserType {
  All,
  Catcher,
  Owner,
}

registerEnumType(UserType, { name: 'UserType' });
@InputType()
export class GetTradesQuery {
  @Field(() => String, { nullable: false })
  userId: string;
  @Field(() => UserType, { nullable: false })
  userType: UserType;
  @Field(() => Number, { nullable: true })
  take: number;
  @Field(() => Number, { nullable: true })
  skip: number;
}
