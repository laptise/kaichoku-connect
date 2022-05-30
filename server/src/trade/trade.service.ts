import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPageInfo } from 'src/common';
import { Repository } from 'typeorm';
import { GetTradesQuery, UserType } from './dto/get-trades.input';
import { NewTradeInput } from './dto/new-trade.input';
import { Trade } from './trade';

const TRADE_SEARCH = `
select distinct
	trade.*
from
	trade
inner join
	tradeRequest		req
    on
		req.id = trade.tradeRequestId
inner join
	tradeRequestCatch	cat
    on
		cat.id = trade.requestCatchId
where
	CASE 
		WHEN :userType = 0
		THEN req.ownerId = :userId OR cat.catcherId = :userId
		WHEN :userType = 1
		THEN cat.catcherId = :userId
		WHEN :userType = 2
		THEN req.ownerId = :userId
	END
	LIMIT :take OFFSET :skip
`;

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

  async getTradeById(id: number) {
    return await this.repo.findOne({ id });
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
