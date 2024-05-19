import { RecipesIngredients, SubrecipesIngredients } from 'src/entities';
import { Ingredients } from 'src/entities/ingredient.entity';
import { DataSource } from 'typeorm';

export const ingredientProviders = [
  {
    provide: 'INGREDIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Ingredients),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'RECIPEINGREDIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RecipesIngredients),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SUBRECIPEINGREDIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SubrecipesIngredients),
    inject: ['DATA_SOURCE'],
  },
];