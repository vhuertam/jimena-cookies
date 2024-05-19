import { Test, TestingModule } from '@nestjs/testing';
import { RecipeSubrecipeResolver } from './recipe-subrecipe.resolver';

describe('RecipeSubrecipeResolver', () => {
  let resolver: RecipeSubrecipeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeSubrecipeResolver],
    }).compile();

    resolver = module.get<RecipeSubrecipeResolver>(RecipeSubrecipeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
