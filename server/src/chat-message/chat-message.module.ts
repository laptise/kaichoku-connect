import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './chat-message';
import { ChatMessageResolver } from './chat-message.resolver';
import { ChatMessageService } from './chat-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  providers: [ChatMessageResolver, ChatMessageService],
})
export class ChatMessageModule {}
