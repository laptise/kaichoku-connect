/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserAddressInfo as Interface } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'userAddressInfo' })
@ObjectType()
export class UserAddressInfo implements Interface {
  @PrimaryColumn()
  @Field((returns) => String)
  userId: string;
  @Column('varchar')
  @Field((returns) => String)
  ctx1: string;
  @Column({ type: 'varchar', nullable: true })
  @Field((returns) => String, { nullable: true })
  ctx2: string;
  @Column({ type: 'varchar', nullable: true })
  @Field((returns) => String, { nullable: true })
  ctx3: string;
  @Column({ type: 'varchar', nullable: true })
  @Field((returns) => String, { nullable: true })
  ctx4: string;
  @Column({ type: 'varchar', nullable: true })
  @Field((returns) => String, { nullable: true })
  ctx5: string;
  @Column({ type: 'varchar', nullable: true })
  @Field((returns) => String, { nullable: true })
  ctx6: string;
  @Column({ type: 'varchar', nullable: true })
  @Field((returns) => String, { nullable: true })
  ctx7: string;
  @Column({ type: 'varchar', nullable: true })
  @Field((returns) => String, { nullable: true })
  ctx8: string;
  @Column({ type: 'varchar', nullable: true })
  @Field((returns) => String, { nullable: true })
  ctx9: string;
  @Column('varchar')
  @Field((returns) => String)
  zipCode: string;
  @Column('varchar')
  @Field((returns) => String)
  countryCode: string;
}
