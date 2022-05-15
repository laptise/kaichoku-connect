/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { NewTradeRequestCatchInput } from './dto/new-trade-request-catch.input';
import { TradeRequestCatch } from './trade-request-catch';
import { TradeRequestCatchService } from './trade-request-catch.service';

@Resolver((of) => TradeRequestCatch)
export class TradeRequestCatchResolver {
  constructor(private tradeRequestCatchService: TradeRequestCatchService) {}

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Mutation((returns) => TradeRequestCatch)
  async newRequestCatch(
    @Args('data') data: NewTradeRequestCatchInput,
    @CurrentUser() user: JWTPayload,
  ) {
    console.log(user.userId);
    if (user) data.catcherId = user.userId;
    return await this.tradeRequestCatchService.catchTradeReuqest(data);
  }
}
