import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewTradeInput } from './dto/new-trade.input';
import { Trade } from './trade';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Trade)
    private repo: Repository<Trade>,
  ) {}

  async newFromCatch(data: NewTradeInput) {
    return await this.repo.create(data).save();
  }
}
