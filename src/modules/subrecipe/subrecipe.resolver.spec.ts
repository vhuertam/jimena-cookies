import { Test, TestingModule } from '@nestjs/testing';
import { SubrecipeResolver } from './subrecipe.resolver';

describe('SubrecipeResolver', () => {
  let resolver: SubrecipeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubrecipeResolver],
    }).compile();

    resolver = module.get<SubrecipeResolver>(SubrecipeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
