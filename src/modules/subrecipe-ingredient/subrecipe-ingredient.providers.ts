import { Ingredients, Subrecipes, SubrecipesIngredients } from 'src/entities';
import { DataSource } from 'typeorm';

export const subrecipeIngredientProviders = [
  {
    provide: 'SUBRECIPEINGREDIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SubrecipesIngredients),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SUBRECIPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Subrecipes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'INGREDIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Ingredients),
    inject: ['DATA_SOURCE'],
  },
];