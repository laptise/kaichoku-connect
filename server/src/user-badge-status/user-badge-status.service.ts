import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBadgeStatus } from './user-badge-status';

@Injectable()
export class UserBadgeStatusService {
  constructor(
    @InjectRepository(UserBadgeStatus)
    private repo: Repository<UserBadgeStatus>,
  ) {}

  async addUserToBadge(ownerId: string, badgeId: number, isUsing = 0) {
    const newBadgeStatus = this.repo.create({
      ownerId,
      badgeId,
      isUsing,
      gotAt: new Date(),
    });
    await this.repo.save(newBadgeStatus);
  }

  async findOwnersUsingBadges(ownerId: string) {
    return await this.repo.find({ where: { ownerId, isUsing: 1 } });
  }
}
