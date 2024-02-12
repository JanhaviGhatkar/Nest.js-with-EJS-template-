import { Test, TestingModule } from '@nestjs/testing';
import { UserUiController } from './user-ui.controller';

describe('UserUiController', () => {
  let controller: UserUiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserUiController],
    }).compile();

    controller = module.get<UserUiController>(UserUiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
