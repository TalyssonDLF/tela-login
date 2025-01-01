import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service'; // Corrigido para UserService

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService], // Corrigido para UserService
    }).compile();

    service = module.get<UserService>(UserService); // Corrigido para UserService
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});