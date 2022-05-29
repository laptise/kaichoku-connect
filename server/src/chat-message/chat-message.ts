/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatMessageType, ChatMessage as ChatMessageEntity } from '@entities';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export enum ChatMessageEnum {
  message = 'message',
  image = 'image',
}

registerEnumType(ChatMessageEnum, { name: 'ChatMessageEnum' });

/**チャットメッセージ Entity */
@Entity({ name: 'chatMessage' })
@ObjectType()
export class ChatMessage extends BaseEntity implements ChatMessageEntity {
  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Number)
  id: number;
  @Field(() => Number)
  @PrimaryColumn({ type: 'bigint' })
  roomId: number;
  @Field(() => String)
  @Column({ type: 'varchar' })
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
