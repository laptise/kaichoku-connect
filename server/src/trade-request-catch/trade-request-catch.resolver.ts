/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';
import { NewTradeRequestCatchInput } from './dto/new-trade-request-catch.input';
import { TradeRequestCatch } from './trade-request-catch';
import { TradeRequestCatchService } from './trade-request-catch.service';

@Resolver((of) => TradeRequestCatch)
export class TradeRequestCatchResolver {
  constructor(
    private tradeRequestCatchService: TradeRequestCatchService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Mutation((returns) => TradeRequestCatch)
  async newRequestCatch(
    @Args('data') data: NewTradeRequestCatchInput,
    @CurrentUser() user: JWTPayload,
  ) {
    if (user) data.catcherId = user.userId;
    return await this.tradeRequestCatchService.catchTradeReuqest(data);
  }

  @Query(() => [TradeRequestCatch])
  async getPendingRequestCatchByTradeId(
    @Args('tradeRequestId') tradeRequestId: number,
  ) {
    return await this.tradeRequestCatchService.getByTradeRequestId(
      tradeRequestId,
    );
  }

  @ResolveField('catcher', () => User)
  async getCatcherInfo(@Parent() requestCatch: TradeRequestCatch) {
    return await this.userService.findById(requestCatch.catcherId);
  }
}
