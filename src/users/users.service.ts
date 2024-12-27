import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private httpService: HttpService,
  ) {}

  async create(user: User): Promise<User> {
    const addressValid = await this.validateAddress(user.address);
    if (!addressValid) {
      throw new Error('Endereço inválido');
    }
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, user: User): Promise<User> {
    const addressValid = await this.validateAddress(user.address);
    if (!addressValid) {
      throw new Error('Endereço inválido');
    }
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private async validateAddress(address: string): Promise<boolean> {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (!cepRegex.test(address)) {
      return false;
    }
    const response = await firstValueFrom(this.httpService.get(`https://viacep.com.br/ws/${address}/json/`));
    return response.data && !response.data.erro;
  }
}