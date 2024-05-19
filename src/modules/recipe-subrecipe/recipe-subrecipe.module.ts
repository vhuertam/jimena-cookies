import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { recipeSubrecipeProviders } from './recipe-subrecipe.providers';
import { RecipeSubrecipeResolver } from './recipe-subrecipe.resolver';
import { RecipeSubrecipeService } from './recipe-subrecipe.service';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...recipeSubrecipeProviders,
    RecipeSubrecipeResolver,
    RecipeSubrecipeService,
  ],
})
export class RecipeSubrecipeModule {}