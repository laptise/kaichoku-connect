/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { TradeRequestComment } from './trade-request-comment';
import { TradeRequestCommentService } from './trade-request-comment.service';

@Resolver((of) => TradeRequestComment)
export class TradeRequestCommentResolver {
  constructor(private tradeRequestCommentService: TradeRequestCommentService) {}

  @Query((returns) => [TradeRequestComment])
  async getMajorCategoryMsts(@Args('requestId') requestId: number) {
    return await this.tradeRequestCommentService.getComments(requestId);
  }
}
