import { Test, TestingModule } from '@nestjs/testing';
import { HeaderController } from './header.controller';

describe('HeaderController', () => {
  let controller: HeaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeaderController],
    }).compile();

    controller = module.get<HeaderController>(HeaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
