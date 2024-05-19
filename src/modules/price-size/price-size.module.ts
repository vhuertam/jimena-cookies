import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { priceSizeProviders } from './price-size.providers';
import { PriceSizeResolver } from './price-size.resolver';
import { PriceSizeService } from './price-size.service';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...priceSizeProviders,
    PriceSizeResolver,
    PriceSizeService
  ],
})
export class PriceSizeModule {}