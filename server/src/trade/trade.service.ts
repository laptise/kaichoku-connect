import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPageInfo } from 'src/common';
import { Repository } from 'typeorm';
import { GetTradesQuery, UserType } from './dto/get-trades.input';
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

  async getTradeByUserId(userId: string) {
    return this.repo.find({
      where: [{ ownerId: userId }, { catcherId: userId }],
    });
  }

  async getCommentsWithQuery({ userId, userType, take, skip }: GetTradesQuery) {
    const condition = (() => {
      switch (userType) {
        case UserType.All:
          return [{ ownerId: userId }, { catcherId: userId }];
        case UserType.Catcher:
          return { catcherId: userId };
        case UserType.Owner:
          return { ownerId: userId };
        default:
          throw 'invalid userType';
      }
    })();
    const fc = await this.repo.findAndCount({
      where: condition,
      order: { createdAt: 'DESC' },
      take,
      skip,
    });
    return getPageInfo(fc, take, skip);
  }
}
