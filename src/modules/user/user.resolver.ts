import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { User, UserData } from "src/graphql";
import { UserService } from "./user.service";


@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService
  ) {}

  @Query('getUsers')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation('createUser')
  async createUser(@Args('input') args: UserData): Promise<User> {
    return this.userService.createUser(args);
  }
  
  @Mutation('editUser')
  async editUser(@Args('id') id: string, @Args('input') args: UserData): Promise<User> {
    return this.userService.editUser(id, args);
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }

}
