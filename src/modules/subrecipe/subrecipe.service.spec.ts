import { Test, TestingModule } from '@nestjs/testing';
import { SubrecipeService } from './subrecipe.service';

describe('SubrecipeService', () => {
  let service: SubrecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubrecipeService],
    }).compile();

    service = module.get<SubrecipeService>(SubrecipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
