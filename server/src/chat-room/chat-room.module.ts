import { Module } from '@nestjs/common';
import { ChatRoomResolver } from './chat-room.resolver';
import { ChatRoomService } from './chat-room.service';

@Module({
  providers: [ChatRoomResolver, ChatRoomService]
})
export class ChatRoomModule {}
