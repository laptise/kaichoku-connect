import { Module } from '@nestjs/common';
import { TradeRequestCommentService } from './trade-request-comment.service';
import { TradeRequestCommentResolver } from './trade-request-comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeRequestComment } from './trade-request-comment';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TradeRequestComment, User])],
  providers: [
    TradeRequestCommentService,
    TradeRequestCommentResolver,
    UserService,
  ],
})
export class TradeRequestCommentModule {}
