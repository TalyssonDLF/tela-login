import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller'; // Corrigido para UserController
import { UserService } from './users.service'; // Certifique-se de que o UserService está sendo importado corretamente

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController], // Corrigido para UserController
      providers: [UserService], // Adicione o UserService como um provedor
    }).compile();

    controller = module.get<UserController>(UserController); // Corrigido para UserController
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});