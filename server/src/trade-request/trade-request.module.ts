import { Module } from '@nestjs/common';
import { TradeRequestService } from './trade-request.service';
import { TradeRequestResolver } from './trade-request.resolver';

@Module({
  providers: [TradeRequestService, TradeRequestResolver],
})
export class TradeRequestModule {}
