import { Field, ObjectType } from '@nestjs/graphql';
import { AddressCtxMst as Interface } from '@entities';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'addressCtxMst' })
@ObjectType()
export class AddressCtxMst implements Interface {
  @PrimaryColumn('varchar')
  @Field(() => String)
  countryCode: string;
  @Column('varchar')
  @Field(() => String)
  ctx1: string;
  @Column('varchar')
  @Field(() => String)
  ctx2: string;
  @Column('varchar')
  @Field(() => String)
  ctx3: string;
  @Column('varchar')
  @Field(() => String)
  ctx4: string;
  @Column('varchar')
  @Field(() => String)
  ctx5: string;
  @Column('varchar')
  @Field(() => String)
  ctx6: string;
  @Column('varchar')
  @Field(() => String)
  ctx7: string;
  @Column('varchar')
  @Field(() => String)
  ctx8: string;
  @Field(() => String)
  @Column('varchar')
  ctx9: string;
}
