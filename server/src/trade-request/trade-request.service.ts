import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JWTPayload } from 'src/auth/auth.service';
import { FindConditions, MoreThan, Repository } from 'typeorm';
import { NewTradeRequestInput } from './dto/newTradeRequest.input';
import { TradeRequest } from './trade-request';

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
    const { title, content } = data;
    const createdAt = new Date();
    const ownerId = userId;
    const newData = this.repo.create({ title, content, createdAt, ownerId });
    const save = await this.repo.save(newData);
    return save;
  }

  async getTradeRequstById(id: number) {
    return await this.repo.findOne({ id });
  }

  async getTradeRequests(limit: number, ownerId: number) {
    console.log(ownerId);
    const where: FindConditions<TradeRequest> = {};
    if (ownerId !== 0) {
      where.ownerId = ownerId;
    }
    return await this.repo.find({
      where,
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
