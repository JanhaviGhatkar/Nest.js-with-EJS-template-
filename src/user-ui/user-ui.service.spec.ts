import { Test, TestingModule } from '@nestjs/testing';
import { UserUiService } from './user-ui.service';

describe('UserUiService', () => {
  let service: UserUiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUiService],
    }).compile();

    service = module.get<UserUiService>(UserUiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
