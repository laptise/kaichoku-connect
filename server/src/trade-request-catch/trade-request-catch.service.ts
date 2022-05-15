import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeRequestCatch } from './trade-request-catch';

@Injectable()
export class TradeRequestCatchService {
  constructor(
    @InjectRepository(TradeRequestCatch)
    private repo: Repository<TradeRequestCatch>,
  ) {}
}
