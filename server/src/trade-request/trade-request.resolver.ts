/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { JWTPayload } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { MajorCategoryMst } from 'src/major-category-mst/major-category-mst';
import { MajorCategoryMstService } from 'src/major-category-mst/major-category-mst.service';
import { MinorCategoryMst } from 'src/minor-category-mst/minor-category-mst';
import { MinorCategoryMstService } from 'src/minor-category-mst/minor-category-mst.service';
import { TradeRequestImageRelationService } from 'src/trade-request-image-relation/trade-request-image-relation.service';
import { TradeRequestImage } from 'src/trade-request-image/trade-request-image';
import { TradeRequestImageService } from 'src/trade-request-image/trade-request-image.service';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';
import { NewTradeRequestInput } from './dto/newTradeRequest.input';
import { TradeRequest } from './trade-request';
import { TradeRequestService } from './trade-request.service';

const requestAdded = new PubSub();

@Resolver((of) => TradeRequest)
export class TradeRequestResolver {
  constructor(
    private tradeService: TradeRequestService,
    private userService: UserService,
    private majorCategoryMstService: MajorCategoryMstService,
    private minorCategoryMstService: MinorCategoryMstService,
    private tradeRequestImageService: TradeRequestImageService,
    private tradeRequestImageRelationService: TradeRequestImageRelationService,
  ) {}

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Mutation((returns) => TradeRequest)
  async addNewTradeRequest(
    @Args('data') data: NewTradeRequestInput,
    @CurrentUser() user: JWTPayload,
  ) {
    const newRequest = await this.tradeService.addNewTradeRequest(data, user);
    const recentItems = await this.tradeService.getTradeRequests(10, '');
    requestAdded.publish('newRequests', {
      newRequests: recentItems,
    });
    return newRequest;
  }

  @Query((returns) => [TradeRequest])
  async getTradeRequests(
    @Args('limit', { name: 'limit', nullable: true, defaultValue: 100 })
    limit: number,
    @Args('ownerId', { nullable: true, defaultValue: '' }) ownerId: string,
  ) {
    return await this.tradeService.getTradeRequests(limit, ownerId);
  }

  @Query(() => TradeRequest)
  async getTradeRequestById(
    @Args('id', { name: 'id', nullable: false })
    id: number,
  ) {
    return await this.tradeService.getTradeRequstById(id);
  }

  @Subscription((returns) => [TradeRequest], { name: 'newRequests' })
  getLatestTradeRequests() {
    return requestAdded.asyncIterator('newRequests');
  }

  @ResolveField('owner', (returns) => User)
  async owner(@Parent() tradeRequest: TradeRequest) {
    console.log(tradeRequest);
    return await this.userService.findById(tradeRequest.ownerId);
  }

  @ResolveField('majorCategory', () => MajorCategoryMst)
  async majorCategory(@Parent() tradeRequest: TradeRequest) {
    return await this.majorCategoryMstService.findById(
      tradeRequest.majorCategoryId,
    );
  }

  @ResolveField('minorCategory', () => MinorCategoryMst)
  async minorCategory(@Parent() tradeRequest: TradeRequest) {
    return await this.minorCategoryMstService.findById(
      tradeRequest.minorCategoryId,
    );
  }

  @ResolveField('images', () => [TradeRequestImage])
  async images(@Parent() tradeRequest: TradeRequest) {
    const relations =
      await this.tradeRequestImageRelationService.getByTradeRequestId(
        tradeRequest.id,
      );
    return await Promise.all(
      relations.map(({ tradeRequestImageId }) =>
        this.tradeRequestImageService.findById(tradeRequestImageId),
      ),
    );
  }
}
