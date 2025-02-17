import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() userData: CreateUserDto) {
    const user = await this.userService.createUser(userData);
    return user;
  }

  @Get('/')
  async findAll(): Promise<User[]>{
    const users = await this.userService.findAll()
    return users
  }
}
