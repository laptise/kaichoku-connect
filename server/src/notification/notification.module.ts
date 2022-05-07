import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeRequestComment } from 'src/trade-request-comment/trade-request-comment';
import { TradeRequestCommentService } from 'src/trade-request-comment/trade-request-comment.service';
import { TradeRequest } from 'src/trade-request/trade-request';
import { TradeRequestService } from 'src/trade-request/trade-request.service';
import { Notification } from './notification';
import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, TradeRequestComment, TradeRequest]),
  ],
  providers: [
    NotificationResolver,
    NotificationService,
    TradeRequestCommentService,
    TradeRequestService,
  ],
})
export class NotificationModule {}
