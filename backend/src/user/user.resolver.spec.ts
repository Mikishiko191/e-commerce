import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.resolver';

describe('UserController', () => {
  let resolver: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserController],
    }).compile();

    resolver = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
