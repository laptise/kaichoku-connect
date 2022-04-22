import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { UserBadgeStatusService } from 'src/user-badge-status/user-badge-status.service';
import { UserBadgeStatus } from 'src/user-badge-status/user-badge-status';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserBadgeStatus])],
  providers: [UserService, UserResolver, UserBadgeStatusService],
  exports: [UserService],
})
export class UserModule {}
