import { Products } from 'src/entities';
import { PricesSizes } from 'src/entities/priceSize.entity';
import { DataSource } from 'typeorm';

export const priceSizeProviders = [
  {
    provide: 'PRICESIZE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PricesSizes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Products),
    inject: ['DATA_SOURCE'],
  },
];
