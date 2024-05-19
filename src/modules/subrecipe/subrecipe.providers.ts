import { RecipesSubrecipes, SubrecipesIngredients } from 'src/entities';
import { Subrecipes } from 'src/entities/subrecipe.entity';
import { DataSource } from 'typeorm';

export const subrecipeProviders = [
  {
    provide: 'SUBRECIPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Subrecipes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'RECIPESUBRECIPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RecipesSubrecipes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SUBRECIPEINGREDIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SubrecipesIngredients),
    inject: ['DATA_SOURCE'],
  },
];