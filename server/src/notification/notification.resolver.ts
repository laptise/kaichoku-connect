/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewNotificationInput } from './dto/new-notification.input';
import { Notification } from './notification';
import { NotificationService } from './notification.service';

const pubSub = new PubSub();

@Resolver()
export class NotificationResolver {
  constructor(private notificationService: NotificationService) {}

  @Mutation((returns) => Notification)
  async addNewNotification(@Args('data') data: NewNotificationInput) {
    const newNotification = await this.notificationService.addNewNotification(
      data,
    );
    await pubSub.publish('newNotification', { newNotification });
    return newNotification;
  }

  @Subscription((returns) => Notification, {
    filter: (payload, variables) =>
      payload.newNotification.targetUserId === variables.targetUserId,
  })
  newNotification(@Args('targetUserId') targetUserId: string) {
    return pubSub.asyncIterator('newNotification');
  }
}
