import { Test, TestingModule } from '@nestjs/testing';
import { PriceSizeResolver } from './price-size.resolver';

describe('PriceSizeResolver', () => {
  let resolver: PriceSizeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceSizeResolver],
    }).compile();

    resolver = module.get<PriceSizeResolver>(PriceSizeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
