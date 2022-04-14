import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Test {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;
  @Column()
  @Field()
  value: string;
}
