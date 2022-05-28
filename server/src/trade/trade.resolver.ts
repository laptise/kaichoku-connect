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
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { TradeRequestCatchService } from 'src/trade-request-catch/trade-request-catch.service';
import { TradeRequest } from 'src/trade-request/trade-request';
import { TradeRequestService } from 'src/trade-request/trade-request.service';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';
import { GetTradesQuery } from './dto/get-trades.input';
import { Trade, TradesWithPagination } from './trade';
import { TradeService } from './trade.service';

@Resolver((of) => Trade)
export class TradeResolver {
  constructor(
    private tradeService: TradeService,
    private tradeRequestCatchService: TradeRequestCatchService,
    private chatRoomService: ChatRoomService,
    private tradeRequestService: TradeRequestService,
    private userService: UserService,
  ) {}

  /**取引承諾からチャットルームを作る */
  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Mutation((returns) => Trade)
  async newTradeFromCatch(
    @Args('catchId') catchId: number,
    @CurrentUser() user: JWTPayload,
  ) {
    const targetCatch = await this.tradeRequestCatchService.getById(catchId);
    const request = await this.tradeRequestService.getTradeRequstById(
      targetCatch.tradeRequestId,
    );
    const [trade] = await Promise.all([
      await this.tradeService.newFromCatch({
        catcherId: targetCatch.catcherId,
        tradeRequestId: request.id,
        ownerId: user.userId,
      }),
      await this.chatRoomService.newChatFromTradeCatch(catchId),
      await this.tradeRequestService.setRequestToCatched(request.id),
      await this.tradeRequestCatchService.closeRequestCatch(catchId),
    ]);
    return trade;
  }

  @Query((returns) => TradesWithPagination)
  async getTrades(@Args('q') q: GetTradesQuery): Promise<TradesWithPagination> {
    return await this.tradeService.getCommentsWithQuery(q);
  }

  @Query(() => [Trade])
  async getTradesByUserId(@Args('userId') userId: string) {
    return await this.tradeService.getTradeByUserId(userId);
  }

  @ResolveField('owner', () => User)
  async getOwnerInfo(@Parent() trade: Trade) {
    return await this.userService.findById(trade.ownerId);
  }

  @ResolveField('catcher', () => User)
  async getCatcherInfo(@Parent() trade: Trade) {
    return await this.userService.findById(trade.catcherId);
  }

  @ResolveField('request', () => TradeRequest)
  async getRequest(@Parent() trade: Trade) {
    return await this.tradeRequestService.getTradeRequstById(
      trade.tradeRequestId,
    );
  }
}
