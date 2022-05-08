import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPageInfo } from 'src/common';
import { Repository } from 'typeorm';
import { GetTradeRequestCommentInput } from './dto/get-trade-request-comment.input';
import { NewTradeRequestCommentInput } from './dto/new-trade-request-comment.input';
import { TradeRequestComment } from './trade-request-comment';

@Injectable()
export class TradeRequestCommentService {
  constructor(
    @InjectRepository(TradeRequestComment)
    private repo: Repository<TradeRequestComment>,
  ) {}

  async getComments({ requestId, take, skip }: GetTradeRequestCommentInput) {
    const fc = await this.repo.findAndCount({
      where: { tradeRequestId: requestId },
      order: { createdAt: 'DESC' },
      take,
      skip,
    });
    return getPageInfo(fc, take, skip);
  }

  async addNew(data: NewTradeRequestCommentInput) {
    return await this.repo.create(data).save();
  }
}
