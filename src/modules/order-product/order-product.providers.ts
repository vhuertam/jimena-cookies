import { Orders, OrdersProducts, Products } from 'src/entities';
import { DataSource } from 'typeorm';

export const orderProductProviders = [
  {
    provide: 'ORDERPRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OrdersProducts),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Orders),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Products),
    inject: ['DATA_SOURCE'],
  },
];
