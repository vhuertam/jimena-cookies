import { Test, TestingModule } from '@nestjs/testing';
import { PriceSizeService } from './price-size.service';

describe('PriceSizeService', () => {
  let service: PriceSizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceSizeService],
    }).compile();

    service = module.get<PriceSizeService>(PriceSizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
