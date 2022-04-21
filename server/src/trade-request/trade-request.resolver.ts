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
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';
import { GetTradeRequestInput } from './dto/getTradeRequest.input';
import { NewTradeRequestInput } from './dto/newTradeRequest.input';
import { TradeRequest } from './trade-request';
import { TradeRequestService } from './trade-request.service';

const requestAdded = new PubSub();

@Resolver((of) => TradeRequest)
export class TradeRequestResolver {
  constructor(
    private tradeService: TradeRequestService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Mutation((returns) => TradeRequest)
  async addNewTradeRequest(
    @Args('data') data: NewTradeRequestInput,
    @CurrentUser() user: JWTPayload,
  ) {
    const newRequest = await this.tradeService.addNewTradeRequest(data, user);
    const recentItems = await this.tradeService.getTradeRequests(10, 0);
    requestAdded.publish('newRequests', {
      newRequests: recentItems,
    });
    return newRequest;
  }

  @Query((returns) => [TradeRequest])
  async getTradeRequests(
    @Args('limit', { name: 'limit', nullable: true, defaultValue: 100 })
    limit: number,
    @Args('ownerId', { nullable: true, defaultValue: 0 }) ownerId: number,
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
}
