import { Module } from '@nestjs/common';
import { TradeRequestCommentService } from './trade-request-comment.service';
import { TradeRequestCommentResolver } from './trade-request-comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeRequestComment } from './trade-request-comment';

@Module({
  imports: [TypeOrmModule.forFeature([TradeRequestComment])],
  providers: [TradeRequestCommentService, TradeRequestCommentResolver],
})
export class TradeRequestCommentModule {}
