import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from './trade';
import { TradeResolver } from './trade.resolver';
import { TradeService } from './trade.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trade])],
  providers: [TradeResolver, TradeService],
})
export class TradeModule {}
