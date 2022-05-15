import { Module } from '@nestjs/common';
import { TradeRequestCatchService } from './trade-request-catch.service';
import { TradeRequestCatchResolver } from './trade-request-catch.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeRequestCatch } from './trade-request-catch';

@Module({
  imports: [TypeOrmModule.forFeature([TradeRequestCatch])],
  providers: [TradeRequestCatchService, TradeRequestCatchResolver],
})
export class TradeRequestCatchModule {}
