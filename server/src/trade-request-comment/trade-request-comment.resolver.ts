/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';
import { NewTradeRequestCommentInput } from './dto/new-trade-request-comment.input';
import { TradeRequestComment } from './trade-request-comment';
import { TradeRequestCommentService } from './trade-request-comment.service';

@Resolver((of) => TradeRequestComment)
export class TradeRequestCommentResolver {
  constructor(
    private tradeRequestCommentService: TradeRequestCommentService,
    private userService: UserService,
  ) {}

  @Query((returns) => [TradeRequestComment])
  async getComments(@Args('requestId') requestId: number) {
    return await this.tradeRequestCommentService.getComments(requestId);
  }

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Mutation((returns) => TradeRequestComment)
  async addComment(
    @Args('data') data: NewTradeRequestCommentInput,
    @CurrentUser() user: JWTPayload,
  ) {
    data.createdBy = user.userId;
    return await this.tradeRequestCommentService.addNew(data);
  }

  @ResolveField('author', () => User)
  async getAuthor(@Parent() comment: TradeRequestComment) {
    return await this.userService.findById(comment.createdBy);
  }
}
