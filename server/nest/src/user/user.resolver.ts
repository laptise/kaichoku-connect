import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from 'src/test/dto/newUser.input copy';
import { User } from './user';
import { UserService } from './user.service';

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
  async addUser(@Args('newTest') newTest: UserInput): Promise<User> {
    return await this.userService.create(newTest);
  }
}
