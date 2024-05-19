import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { orderProductProviders } from './order-product.providers';
import { OrderProductResolver } from './order-product.resolver';
import { OrderProductService } from './order-product.service';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...orderProductProviders,
    OrderProductResolver,
    OrderProductService
  ],
})
export class OrderProductModule {}