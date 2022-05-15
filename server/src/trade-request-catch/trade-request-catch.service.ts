import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewTradeRequestCatchInput } from './dto/new-trade-request-catch.input';
import { TradeRequestCatch } from './trade-request-catch';

@Injectable()
export class TradeRequestCatchService {
  constructor(
    @InjectRepository(TradeRequestCatch)
    private repo: Repository<TradeRequestCatch>,
  ) {}

  async catchTradeReuqest(data: NewTradeRequestCatchInput) {
    return await this.repo.create(data).save();
  }

  async getByTradeRequestId(tradeRequestId: number) {
    return await this.repo.find({ tradeRequestId });
  }
}
