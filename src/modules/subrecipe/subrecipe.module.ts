import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { subrecipeProviders } from './subrecipe.providers';
import { SubrecipeResolver } from './subrecipe.resolver';
import { SubrecipeService } from './subrecipe.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...subrecipeProviders,
    SubrecipeService,
    SubrecipeResolver,
  ],
})
export class SubrecipeModule {}
