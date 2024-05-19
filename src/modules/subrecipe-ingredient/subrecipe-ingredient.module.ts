import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { subrecipeIngredientProviders } from './subrecipe-ingredient.providers';
import { SubrecipeIngredientResolver } from './subrecipe-ingredient.resolver';
import { SubrecipeIngredientService } from './subrecipe-ingredient.service';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...subrecipeIngredientProviders,
    SubrecipeIngredientResolver,
    SubrecipeIngredientService,
  ],
})
export class SubrecipeIngredientModule {}