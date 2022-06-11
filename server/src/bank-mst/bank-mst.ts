import { BankMst as Interface } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'bankMst' })
@ObjectType()
export class BankMst extends BaseEntity implements Interface {
  @PrimaryColumn({ type: 'varchar', unique: true })
  @Field(() => String)
  swiftCode: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  country: string;
}
