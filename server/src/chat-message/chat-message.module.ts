import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';
import { ChatMessage } from './chat-message';
import { ChatMessageResolver } from './chat-message.resolver';
import { ChatMessageService } from './chat-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage, User])],
  providers: [ChatMessageResolver, ChatMessageService, UserService],
})
export class ChatMessageModule {}
