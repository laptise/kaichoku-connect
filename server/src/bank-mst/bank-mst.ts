import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BankMst as BankMstEntity } from '@entities';

@Entity({ name: 'bankMst' })
@ObjectType()
export class BankMst extends BaseEntity implements BankMstEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Number, { nullable: false })
  id: number;

  @Column({ type: 'varchar', unique: true })
  @Field(() => String)
  swiftCode: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  country: string;
}
