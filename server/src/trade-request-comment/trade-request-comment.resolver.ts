/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';
import { GetTradeRequestCommentInput } from './dto/get-trade-request-comment.input';
import {
  TradeRequestComment,
  TradeRequestCommentWithPagination,
} from './trade-request-comment';
import { TradeRequestCommentService } from './trade-request-comment.service';

@Resolver((of) => TradeRequestComment)
export class TradeRequestCommentResolver {
  constructor(
    private tradeRequestCommentService: TradeRequestCommentService,
    private userService: UserService,
  ) {}

  @Query((returns) => TradeRequestCommentWithPagination)
  async getComments(
    @Args('condition') condition: GetTradeRequestCommentInput,
  ): Promise<TradeRequestCommentWithPagination> {
    return await this.tradeRequestCommentService.getComments(condition);
  }

  @ResolveField('author', () => User)
  async getAuthor(@Parent() comment: TradeRequestComment) {
    return await this.userService.findById(comment.createdBy);
  }
}
