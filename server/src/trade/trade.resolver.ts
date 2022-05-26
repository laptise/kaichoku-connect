/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { TradeRequestCatchService } from 'src/trade-request-catch/trade-request-catch.service';
import { TradeRequestService } from 'src/trade-request/trade-request.service';
import { NewTradeInput } from './dto/new-trade.input';
import { Trade } from './trade';
import { TradeService } from './trade.service';

@Resolver()
export class TradeResolver {
  constructor(
    private tradeService: TradeService,
    private tradeRequestCatchService: TradeRequestCatchService,
    private chatRoomService: ChatRoomService,
    private tradeRequestService: TradeRequestService,
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
      await this.tradeRequestCatchService.closeRequestCatch(catchId),
    ]);
    return trade;
  }
}
