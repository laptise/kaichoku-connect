import { Module } from '@nestjs/common';
import { TradeRequestService } from './trade-request.service';
import { TradeRequestResolver } from './trade-request.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeRequest } from './trade-request';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user';

@Module({
  imports: [TypeOrmModule.forFeature([TradeRequest, User])],
  providers: [TradeRequestService, TradeRequestResolver, UserService],
  exports: [TradeRequestService],
})
export class TradeRequestModule {}
