import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { orderProviders } from './order.providers';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...orderProviders,
    OrderService,
    OrderResolver
  ],
})
export class OrderModule {}