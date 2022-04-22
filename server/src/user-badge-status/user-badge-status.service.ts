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

  async findOwnersUsingBadges(ownerId: string) {
    return await this.repo.find({ where: { ownerId, isUsing: 1 } });
  }
}
