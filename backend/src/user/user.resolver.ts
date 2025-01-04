import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.model';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post()
  async createUser(
    @Body('username') username: string,
    @Body('email') email: string,
  ): Promise<User> {
    return this.userService.createUser(username, email);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body('username') username: string,
    @Body('email') email: string,
  ): Promise<User> {
    return this.userService.updateUser(id, username, email);
  }
}
