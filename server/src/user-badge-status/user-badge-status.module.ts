import { Module } from '@nestjs/common';
import { UserBadgeStatusService } from './user-badge-status.service';
import { UserBadgeStatusResolver } from './user-badge-status.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBadgeStatus } from './user-badge-status';

@Module({
  imports: [TypeOrmModule.forFeature([UserBadgeStatus])],
  providers: [UserBadgeStatusService, UserBadgeStatusResolver],
  exports: [UserBadgeStatusService],
})
export class UserBadgeStatusModule {}
