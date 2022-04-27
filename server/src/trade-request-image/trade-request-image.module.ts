import { Module } from '@nestjs/common';
import { TradeRequestImageService } from './trade-request-image.service';
import { TradeRequestImageResolver } from './trade-request-image.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeRequestImage } from './trade-request-image';

@Module({
  imports: [TypeOrmModule.forFeature([TradeRequestImage])],
  providers: [TradeRequestImageService, TradeRequestImageResolver],
})
export class TradeRequestImageModule {}
