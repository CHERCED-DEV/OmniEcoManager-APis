import { Test, TestingModule } from '@nestjs/testing';
import { StrapiPopulationService } from './strapi-population.service';

describe('StrapiPopulationService', () => {
  let service: StrapiPopulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StrapiPopulationService],
    }).compile();

    service = module.get<StrapiPopulationService>(StrapiPopulationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
