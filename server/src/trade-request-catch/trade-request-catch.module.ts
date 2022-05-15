import { Module } from '@nestjs/common';
import { TradeRequestCatchService } from './trade-request-catch.service';
import { TradeRequestCatchResolver } from './trade-request-catch.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeRequestCatch } from './trade-request-catch';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TradeRequestCatch, User])],
  providers: [TradeRequestCatchService, TradeRequestCatchResolver, UserService],
})
export class TradeRequestCatchModule {}
