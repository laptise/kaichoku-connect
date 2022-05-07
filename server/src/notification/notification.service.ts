import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewNotificationInput } from './dto/new-notification.input';
import { Notification } from './notification';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private repo: Repository<Notification>,
  ) {}

  async getRecentNotification(ownerId: string) {
    return this.repo.find({
      where: { targetUserId: ownerId },
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }

  async addNewNotification(data: NewNotificationInput) {
    const newNotification = await this.repo.create(data).save();
    return newNotification;
  }
}
