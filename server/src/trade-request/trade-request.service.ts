import { JWTPayload, TradeRequestStatus } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Not, Repository } from 'typeorm';
import { NewTradeRequestInput } from './dto/new-trade-request.input';
import { TradeRequest, TradeRequestStatusEnum } from './trade-request';

@Injectable()
export class TradeRequestService {
  constructor(
    @InjectRepository(TradeRequest)
    private repo: Repository<TradeRequest>,
  ) {}

  async addNewTradeRequest(data: NewTradeRequestInput, { userId }: JWTPayload) {
    console.log('data');
    console.log(data);
    console.log('user');
    const entity = this.repo.create(data);
    entity.createdAt = new Date();
    entity.ownerId = userId;
    console.log(entity);
    return await this.repo.save(entity);
  }

  async findById(id: number) {
    // await this.repo.increment({ id }, 'VIEWED_TIMES', 1);
    return await this.repo.findOne({ id });
  }

  async getTradeRequests(limit: number, ownerId: string, countryCode?: string) {
    console.log(ownerId);
    const where: FindConditions<TradeRequest> = { status: Not('opened') };
    if (ownerId) {
      where.ownerId = ownerId;
    }
    if (countryCode) {
      where.targetCountryCode = countryCode;
    }
    return await this.repo.find({
      where,
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getTradeRequestByOwnerId(ownerId: string) {
    return this.repo.find({
      ownerId,
      status: 'pending',
    });
  }

  async setRequestToCatched(tradeRequestId: number) {
    return await this.repo.update(
      { id: tradeRequestId },
      { status: 'catched' },
    );
  }
}
