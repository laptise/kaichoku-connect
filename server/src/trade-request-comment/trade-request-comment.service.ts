import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeRequestComment } from './trade-request-comment';

@Injectable()
export class TradeRequestCommentService {
  constructor(
    @InjectRepository(TradeRequestComment)
    private repo: Repository<TradeRequestComment>,
  ) {}
  async getComments(tradeRequestId: number) {
    return this.repo.find({ tradeRequestId });
  }
}
