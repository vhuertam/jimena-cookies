import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { recipeProviders } from './recipe.providers';
import { RecipeResolver } from './recipe.resolver';
import { RecipeService } from './recipe.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...recipeProviders,
    RecipeService,
    RecipeResolver
  ],
})
export class RecipeModule {}
