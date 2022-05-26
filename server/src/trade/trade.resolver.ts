/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { TradeRequestCatchService } from 'src/trade-request-catch/trade-request-catch.service';
import { NewTradeInput } from './dto/new-trade.input';
import { Trade } from './trade';
import { TradeService } from './trade.service';

@Resolver()
export class TradeResolver {
  constructor(
    private tradeService: TradeService,
    private tradeRequestCatchService: TradeRequestCatchService,
  ) {}

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Mutation((returns) => Trade)
  async newTradeFromCatch(
    @Args('data') data: NewTradeInput,
    @Args('catchId') catchId: number,
    @CurrentUser() user: JWTPayload,
  ) {
    data.ownerId = user.userId;
    await this.tradeRequestCatchService.closeRequestCatch(catchId);
    return await this.tradeService.newFromCatch(data);
  }
}
