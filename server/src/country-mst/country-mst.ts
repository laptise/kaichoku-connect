import { CountryMst as CountryMstType } from '@entities';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'countryMst' })
@ObjectType()
export class CountryMst extends BaseEntity implements CountryMstType {
  @PrimaryColumn('int')
  @Field(() => Int)
  telCode: number;
  @Field(() => String)
  @PrimaryColumn('varchar')
  code: string;
  @Column('varchar')
  @Field(() => String)
  name: string;
}
