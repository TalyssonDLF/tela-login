import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    console.log('Requisição recebida:', user); // Adicione este log para verificar os dados recebidos
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    return this.userService.create(user);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<User> {
    console.log('Requisição de login recebida:', body); // Adicione este log para verificar os dados recebidos
    const user = await this.userService.findOneByEmail(body.email);
    if (!user || user.password !== body.password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}