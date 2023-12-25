import { Test, TestingModule } from '@nestjs/testing';
import { HttpHandlerService } from './http-handler.service';

describe('HttpHandlerService', () => {
  let service: HttpHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpHandlerService],
    }).compile();

    service = module.get<HttpHandlerService>(HttpHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
