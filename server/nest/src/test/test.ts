import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Test {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;
  @Column()
  @Field()
  value: string;
}
