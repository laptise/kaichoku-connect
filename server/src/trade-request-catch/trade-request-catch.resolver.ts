import { Resolver } from '@nestjs/graphql';
import { TradeRequestCatch } from './trade-request-catch';
import { TradeRequestCatchService } from './trade-request-catch.service';

@Resolver((of) => TradeRequestCatch)
export class TradeRequestCatchResolver {
  constructor(private tradeRequestCatchService: TradeRequestCatchService) {}
}
