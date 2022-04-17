/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SignInInput, UserInput } from 'src/user/dto/newUser.input';
import { User } from './user';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Query((returns) => [User])
  async users() {
    return await this.userService.findAll();
  }

  @Query((returns) => User)
  async getUserByEmail(@Args('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Mutation((returns) => User)
  async addUser(@Args('newUser') newUser: UserInput): Promise<User> {
    const added = await this.userService.create(newUser);
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
}
