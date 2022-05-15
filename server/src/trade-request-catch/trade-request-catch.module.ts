import { Module } from '@nestjs/common';
import { TradeRequestCatchService } from './trade-request-catch.service';
import { TradeRequestCatchResolver } from './trade-request-catch.resolver';

@Module({
  providers: [TradeRequestCatchService, TradeRequestCatchResolver],
})
export class TradeRequestCatchModule {}
