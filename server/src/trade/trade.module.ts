import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from 'src/chat-room/chat-room';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { TradeRequestCatch } from 'src/trade-request-catch/trade-request-catch';
import { TradeRequestCatchService } from 'src/trade-request-catch/trade-request-catch.service';
import { TradeRequest } from 'src/trade-request/trade-request';
import { TradeRequestService } from 'src/trade-request/trade-request.service';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';
import { Trade } from './trade';
import { TradeResolver } from './trade.resolver';
import { TradeService } from './trade.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Trade,
      TradeRequestCatch,
      ChatRoom,
      TradeRequest,
      User,
    ]),
  ],
  providers: [
    TradeResolver,
    TradeService,
    TradeRequestCatchService,
    ChatRoomService,
    TradeRequestService,
    UserService,
  ],
})
export class TradeModule {}
