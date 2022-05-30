/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatMessageType, ChatMessage as ChatMessageEntity } from '@entities';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  ValueTransformer,
} from 'typeorm';

export enum ChatMessageEnum {
  message = 'message',
  image = 'image',
}

registerEnumType(ChatMessageEnum, { name: 'ChatMessageEnum' });
export const bigint: ValueTransformer = {
  to: (entityValue: number) => entityValue,
  from: (databaseValue: string): number => parseInt(databaseValue, 10),
};
/**チャットメッセージ Entity */
@Entity({ name: 'chatMessage' })
@ObjectType()
export class ChatMessage extends BaseEntity implements ChatMessageEntity {
  @PrimaryColumn({ type: 'bigint', transformer: [bigint] })
  @Field(() => Number)
  id: number;

  @PrimaryColumn({ type: 'bigint', transformer: [bigint] })
  @Field(() => Number)
  roomId: number;

  @Column({ type: 'varchar' })
  @Field(() => String)
  type: ChatMessageType;

  @Field(() => String)
  @Column({ type: 'varchar' })
  content: string;

  @Field(() => Date)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => String)
  @Column({ type: 'varchar' })
  createdBy: string;
}
