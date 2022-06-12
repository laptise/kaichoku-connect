import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { UserBadgeStatusService } from 'src/user-badge-status/user-badge-status.service';
import { UserBadgeStatus } from 'src/user-badge-status/user-badge-status';
import { UserController } from './user.controller';
import { S3Service } from 'src/s3/s3.service';
import { TradeRequestService } from 'src/trade-request/trade-request.service';
import { TradeRequest } from 'src/trade-request/trade-request';
import { UserBankInfoService } from 'src/user-bank-info/user-bank-info.service';
import { UserBankInfo } from 'src/user-bank-info/user-bank-info';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserBadgeStatus,
      TradeRequest,
      UserBankInfo,
    ]),
  ],
  providers: [
    UserService,
    UserResolver,
    UserBadgeStatusService,
    S3Service,
    TradeRequestService,
    UserBankInfoService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
