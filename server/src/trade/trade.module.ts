import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeRequestCatch } from 'src/trade-request-catch/trade-request-catch';
import { TradeRequestCatchService } from 'src/trade-request-catch/trade-request-catch.service';
import { Trade } from './trade';
import { TradeResolver } from './trade.resolver';
import { TradeService } from './trade.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trade, TradeRequestCatch])],
  providers: [TradeResolver, TradeService, TradeRequestCatchService],
})
export class TradeModule {}
