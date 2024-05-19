import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ingredientProviders } from './ingredient.providers';
import { IngredientResolver } from './ingredient.resolver';
import { IngredientService } from './ingredient.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...ingredientProviders,
    IngredientService,
    IngredientResolver,
  ],
})
export class IngredientModule {}
