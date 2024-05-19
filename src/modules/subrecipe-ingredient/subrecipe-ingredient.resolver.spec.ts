import { Test, TestingModule } from '@nestjs/testing';
import { SubrecipeIngredientResolver } from './subrecipe-ingredient.resolver';

describe('SubrecipeIngredientResolver', () => {
  let resolver: SubrecipeIngredientResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubrecipeIngredientResolver],
    }).compile();

    resolver = module.get<SubrecipeIngredientResolver>(SubrecipeIngredientResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
