import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { recipeIngredientProviders } from './recipe-ingredient.providers';
import { RecipeIngredientResolver } from './recipe-ingredient.resolver';
import { RecipeIngredientService } from './recipe-ingredient.service';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...recipeIngredientProviders,
    RecipeIngredientResolver,
    RecipeIngredientService,
  ],
})
export class RecipeIngredientModule {}