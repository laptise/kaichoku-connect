/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

/**利用者 Entity */
@Entity({ name: 'USER' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  @Field((type) => ID)
  id: number;

  @Column({ unique: true, name: 'EMAIL', type: 'varchar', length: 40 })
  @Field()
  email: string;

  /**ニックネーム */
  @Column({ name: 'DISPLAY_NAME', type: 'varchar', length: 20 })
  @Field()
  displayName: string;

  /**ハッシュパスワード */
  @Column({ name: 'PASSWORD', type: 'varchar', length: 256 })
  @Field()
  password: string;
}
