/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChatRoom as ChatRoomEntity,
  ChatRoomFromType,
  Trade as TradeEntity,
} from '@entities';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ChatRoomFromTypeEnum {
  Catch = 'catch',
}
registerEnumType(ChatRoomFromTypeEnum, { name: 'ChatRoomFromTypeEnum' });

/**チャットルーム Entity */
@Entity({ name: 'chatRoom' })
@ObjectType()
export class ChatRoom extends BaseEntity implements ChatRoomEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Number, { nullable: false })
  id: number;

  @Column({ type: 'varchar' })
  @Field(() => ChatRoomFromTypeEnum, { nullable: false })
  fromType: ChatRoomFromType;

  @Column('bigint')
  @Field(() => Number, { nullable: false })
  fromId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  createdAt: Date;
}
