/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWTPayload } from '@entities';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { NewTradeRequestCatchInput } from './dto/new-trade-request-catch.input';
import { TradeRequestCatch } from './trade-request-catch';
import { TradeRequestCatchService } from './trade-request-catch.service';

@Resolver((of) => TradeRequestCatch)
export class TradeRequestCatchResolver {
  constructor(private tradeRequestCatchService: TradeRequestCatchService) {}

  @Mutation((returns) => TradeRequestCatch)
  async catchRequest(
    @Args('data') data: NewTradeRequestCatchInput,
    @CurrentUser() user: JWTPayload,
  ) {
    if (user) data.catcherId = user.userId;
    return await this.tradeRequestCatchService.catchTradeReuqest(data);
  }
}
