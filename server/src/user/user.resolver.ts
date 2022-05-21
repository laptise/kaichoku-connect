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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TradeRequest } from 'src/trade-request/trade-request';
import { TradeRequestService } from 'src/trade-request/trade-request.service';
import { UserBadgeStatus } from 'src/user-badge-status/user-badge-status';
import { UserBadgeStatusService } from 'src/user-badge-status/user-badge-status.service';
import { SignInInput, UserInput } from 'src/user/dto/newUser.input';
import { User } from './user';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private badgeStatusService: UserBadgeStatusService,
    private tradeRequestService: TradeRequestService,
  ) {}

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Query((returns) => [User])
  async users() {
    return await this.userService.findAll();
  }

  @Query((returns) => User)
  async getUserByEmail(@Args('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Query(() => User)
  async getUserById(@Args('id') id: string) {
    return await this.userService.findById(id);
  }

  @Mutation((returns) => User)
  async addUser(@Args('newUser') newUser: UserInput): Promise<User> {
    const added = await this.userService.create(newUser);
    await this.badgeStatusService.addUserToBadge(added.id, 1, 1);
    pubSub.publish('userAdded', { userAdded: added });
    return added;
  }

  @Query((returns) => User)
  async signInWithEmailAndPassword(
    @Args('credential') credential: SignInInput,
  ) {
    return await this.userService.signInWithEmailAndPassword(credential);
  }

  @Subscription((returns) => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }

  @ResolveField('usingBadges', (returns) => [UserBadgeStatus])
  async usingBadges(@Parent() user: User) {
    return await this.badgeStatusService.findOwnersUsingBadges(user.id);
  }

  @ResolveField('requestingTrades', () => [TradeRequest])
  async getTradeRequestByUserId(@Parent() user: User) {
    return await this.tradeRequestService.getTradeRequestByOwnerId(user.id);
  }
}
