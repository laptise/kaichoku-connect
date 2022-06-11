import { BankNameMst as Interface } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'bankNameMst' })
@ObjectType()
export class BankNameMst extends BaseEntity implements Interface {
  @PrimaryColumn({ type: 'varchar' })
  @Field(() => String)
  swiftCode: string;

  @PrimaryColumn({ type: 'varchar' })
  @Field(() => String, { nullable: false })
  lang: string;

  @Column('varchar')
  @Field(() => String, { nullable: false })
  name: string;
}
