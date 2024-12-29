import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './model/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  async createUser(
    @Args('username') username: string,
    @Args('email') email: string,
  ) {
    return this.userService.createUser(username, email);
  }
}
