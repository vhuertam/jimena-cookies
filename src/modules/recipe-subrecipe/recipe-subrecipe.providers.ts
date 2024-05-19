import { Recipes, Subrecipes } from 'src/entities';
import { RecipesSubrecipes } from 'src/entities/recipe_subrecipe.entity';
import { DataSource } from 'typeorm';

export const recipeSubrecipeProviders = [
  {
    provide: 'RECIPESUBRECIPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RecipesSubrecipes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'RECIPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Recipes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SUBRECIPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Subrecipes),
    inject: ['DATA_SOURCE'],
  },
];