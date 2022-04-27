import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeRequestImageRelation } from './trade-request-image-relation';

@Injectable()
export class TradeRequestImageRelationService {
  constructor(
    @InjectRepository(TradeRequestImageRelation)
    private repo: Repository<TradeRequestImageRelation>,
  ) {}

  async getByTradeRequestId(tradeRequestId: number) {
    return await this.repo.find({ where: { tradeRequestId } });
  }
}
