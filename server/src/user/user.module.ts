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
import { UserAddressInfo } from 'src/user-address-info/user-address-info';
import { UserAddressInfoService } from 'src/user-address-info/user-address-info.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserBadgeStatus,
      TradeRequest,
      UserBankInfo,
      UserAddressInfo,
    ]),
  ],
  providers: [
    UserService,
    UserResolver,
    UserBadgeStatusService,
    S3Service,
    TradeRequestService,
    UserBankInfoService,
    UserAddressInfoService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
