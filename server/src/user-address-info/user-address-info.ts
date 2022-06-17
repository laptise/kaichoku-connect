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
  @Column('varchar')
  @Field((returns) => String)
  ctx2: string;
  @Column('varchar')
  @Field((returns) => String)
  ctx3: string;
  @Column('varchar')
  @Field((returns) => String)
  ctx4: string;
  @Column('varchar')
  @Field((returns) => String)
  ctx5: string;
  @Column('varchar')
  @Field((returns) => String)
  ctx6: string;
  @Column('varchar')
  @Field((returns) => String)
  ctx7: string;
  @Column('varchar')
  @Field((returns) => String)
  ctx8: string;
  @Column('varchar')
  @Field((returns) => String)
  ctx9: string;
  @Column('varchar')
  @Field((returns) => String)
  zipCode: string;
  @Column('varchar')
  @Field((returns) => String)
  countryCode: string;
}
