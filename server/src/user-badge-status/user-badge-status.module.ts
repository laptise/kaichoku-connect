import { Module } from '@nestjs/common';
import { UserBadgeStatusService } from './user-badge-status.service';
import { UserBadgeStatusResolver } from './user-badge-status.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBadgeStatus } from './user-badge-status';
import { UserBadgeMst } from 'src/user-badge-mst/user-badge-mst';
import { UserBadgeMstService } from 'src/user-badge-mst/user-badge-mst.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBadgeStatus, UserBadgeMst])],
  providers: [
    UserBadgeStatusService,
    UserBadgeStatusResolver,
    UserBadgeMstService,
  ],
  exports: [UserBadgeStatusService],
})
export class UserBadgeStatusModule {}
