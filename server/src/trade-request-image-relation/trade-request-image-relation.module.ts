import { Module } from '@nestjs/common';
import { TradeRequestImageRelationService } from './trade-request-image-relation.service';
import { TradeRequestImageRelationResolver } from './trade-request-image-relation.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeRequestImageRelation } from './trade-request-image-relation';

@Module({
  imports: [TypeOrmModule.forFeature([TradeRequestImageRelation])],
  providers: [
    TradeRequestImageRelationService,
    TradeRequestImageRelationResolver,
  ],
})
export class TradeRequestImageRelationModule {}
