import { Controller, Get, Post, Put, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    console.log('Requisição recebida:', user); 
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    return this.userService.create(user);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ id: number }> {
    console.log('Requisição de login recebida:', body);
    const user = await this.userService.findOneByEmail(body.email);
    if (!user || user.password !== body.password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return { id: user.id };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    const existingUser = await this.userService.findOne(id);
    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userService.update(id, user);
    return this.userService.findOne(id);
  }
}