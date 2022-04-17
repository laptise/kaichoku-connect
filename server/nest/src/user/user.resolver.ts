/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { query } from 'express';
import { PubSub } from 'graphql-subscriptions';
import { UserInput } from 'src/test/dto/newUser.input copy';
import { User } from './user';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}
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
  async signInWithEmailAndPassword(email: string, password: string) {
    return await this.userService.signInWithEmailAndPassword(email, password);
  }

  @Subscription((returns) => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
