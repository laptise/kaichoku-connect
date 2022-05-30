import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat-message';
import { GetChatMessageInput } from './dto/get-chat-message.input';
import { NewChatMessageInput } from './dto/new-chat-message.input';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectRepository(ChatMessage)
    private repo: Repository<ChatMessage>,
  ) {}

  async addNew(data: NewChatMessageInput) {
    const [record] = await this.repo.manager.query(
      `SELECT getChatRoomId(?) AS ID`,
      [data.roomId],
    );
    const newId = record.ID as number;
    return await this.repo.create({ ...data, ...{ id: newId } }).save();
  }

  async getByCondition(condition: GetChatMessageInput) {
    return await this.repo.find({
      where: { roomId: condition.roomId },
      take: condition.take,
      order: { createdAt: 'DESC' },
    });
  }
}
