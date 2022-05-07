/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';
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

  @ResolveField('author', () => User)
  async getAuthor(@Parent() comment: TradeRequestComment) {
    return await this.userService.findById(comment.createdBy);
  }
}
