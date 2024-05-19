import { OrdersProducts, PricesSizes, Products, Recipes } from 'src/entities';
import { DataSource } from 'typeorm';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Products),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'RECIPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Recipes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRICESIZE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PricesSizes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ORDERPRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OrdersProducts),
    inject: ['DATA_SOURCE'],
  },
];
