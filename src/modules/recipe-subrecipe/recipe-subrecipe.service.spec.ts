import { Test, TestingModule } from '@nestjs/testing';
import { RecipeSubrecipeService } from './recipe-subrecipe.service';

describe('RecipeSubrecipeService', () => {
  let service: RecipeSubrecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeSubrecipeService],
    }).compile();

    service = module.get<RecipeSubrecipeService>(RecipeSubrecipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
