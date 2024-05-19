import { Test, TestingModule } from '@nestjs/testing';
import { RecipeIngredientResolver } from './recipe-ingredient.resolver';

describe('RecipeIngredientResolver', () => {
  let resolver: RecipeIngredientResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeIngredientResolver],
    }).compile();

    resolver = module.get<RecipeIngredientResolver>(RecipeIngredientResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
