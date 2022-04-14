import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query((returns) => [User])
  async users() {
    return await this.userService.findAll();
  }
}
