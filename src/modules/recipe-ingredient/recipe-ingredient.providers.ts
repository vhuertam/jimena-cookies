import { Ingredients, Recipes } from 'src/entities';
import { RecipesIngredients } from 'src/entities/recipe_ingredient.entity';
import { DataSource } from 'typeorm';

export const recipeIngredientProviders = [
  {
    provide: 'RECIPEINGREDIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RecipesIngredients),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'RECIPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Recipes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'INGREDIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Ingredients),
    inject: ['DATA_SOURCE'],
  },
];