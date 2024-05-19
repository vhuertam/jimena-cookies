import { Test, TestingModule } from '@nestjs/testing';
import { SubrecipeIngredientService } from './subrecipe-ingredient.service';

describe('SubrecipeIngredientService', () => {
  let service: SubrecipeIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubrecipeIngredientService],
    }).compile();

    service = module.get<SubrecipeIngredientService>(SubrecipeIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
