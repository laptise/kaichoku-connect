import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewTradeRequestCommentInput } from './dto/new-trade-request-comment.input';
import { TradeRequestComment } from './trade-request-comment';

@Injectable()
export class TradeRequestCommentService {
  constructor(
    @InjectRepository(TradeRequestComment)
    private repo: Repository<TradeRequestComment>,
  ) {}
  async getComments(tradeRequestId: number) {
    return this.repo.find({
      where: { tradeRequestId },
      order: { createdAt: 'DESC' },
    });
  }

  async addNew(data: NewTradeRequestCommentInput) {
    return await this.repo.create(data).save();
  }
}
