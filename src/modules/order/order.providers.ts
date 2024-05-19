import { Orders, OrdersProducts, Users } from 'src/entities';
import { DataSource } from 'typeorm';

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Orders),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ORDERPRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OrdersProducts),
    inject: ['DATA_SOURCE'],
  },
];
