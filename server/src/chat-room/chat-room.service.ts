import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from './chat-room';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private repo: Repository<ChatRoom>,
  ) {}

  async newChatFromTradeCatch(tradeRequestCatchId: number) {
    return await this.repo
      .create({ fromType: 'catch', fromId: tradeRequestCatchId })
      .save();
  }
}
