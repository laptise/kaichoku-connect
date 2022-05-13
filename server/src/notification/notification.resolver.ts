/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { NewTradeRequestCommentInput } from 'src/trade-request-comment/dto/new-trade-request-comment.input';
import { TradeRequestComment } from 'src/trade-request-comment/trade-request-comment';
import { TradeRequestCommentService } from 'src/trade-request-comment/trade-request-comment.service';
import { TradeRequestService } from 'src/trade-request/trade-request.service';
import { NewNotificationInput } from './dto/new-notification.input';
import { Notification } from './notification';
import { NotificationService } from './notification.service';

const NotiPubsub = new PubSub();

@Resolver()
export class NotificationResolver {
  constructor(
    private notificationService: NotificationService,
    private tradeRequestCommentService: TradeRequestCommentService,
    private tradeRequestService: TradeRequestService,
  ) {}

  @Mutation((returns) => Notification)
  async addNewNotification(@Args('data') data: NewNotificationInput) {
    const newNotification = await this.notificationService.addNewNotification(
      data,
    );
    await NotiPubsub.publish('newNotification', { newNotification });
    return newNotification;
  }

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Mutation((returns) => TradeRequestComment)
  async addComment(
    @Args('data') data: NewTradeRequestCommentInput,
    @CurrentUser() user: JWTPayload,
  ) {
    data.createdBy = user.userId;
    const tr = await this.tradeRequestService.getTradeRequstById(
      data.tradeRequestId,
    );
    const newNotification = await this.notificationService.addNewNotification({
      msg: `${user.username}さんがコメントしました。`,
      targetUserId: tr.ownerId,
      createdBy: user.userId,
    });
    await NotiPubsub.publish('newNotification', { newNotification });
    return await this.tradeRequestCommentService.addNew(data);
  }

  @Query((returns) => [Notification])
  async getNotifications(@Args('targetUserId') targetUserId: string) {
    return await this.notificationService.getRecentNotification(targetUserId);
  }

  @Subscription((returns) => Notification, {
    filter: (payload, variables) =>
      payload.newNotification.targetUserId === variables.targetUserId,
  })
  newNotification(@Args('targetUserId') targetUserId: string) {
    return NotiPubsub.asyncIterator('newNotification');
  }
}
