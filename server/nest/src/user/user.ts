import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'USER' })
@ObjectType()
export class User {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  @Field((type) => ID)
  email: string;
  @Column({ name: 'DISPLAY_NAME', type: 'varchar', length: 20 })
  @Field()
  displayName: string;
}
