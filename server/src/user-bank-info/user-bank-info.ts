import { UserBankInfo as Interface } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'userBankInfo' })
@ObjectType()
export class UserBankInfo extends BaseEntity implements Interface {
  @PrimaryColumn('varchar')
  @Field(() => String, { nullable: false })
  userId: string;
  @Column('varchar')
  @Field(() => String, { nullable: false })
  swiftCode: string;
  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  accountType?: string;
  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  branchCode?: string;
  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  accountNo: string;
  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  accountName: string;
}
