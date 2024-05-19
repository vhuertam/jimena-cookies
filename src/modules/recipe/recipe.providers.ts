import { OrdersProducts, PricesSizes, Products, Recipes, RecipesIngredients, RecipesSubrecipes } from 'src/entities';
import { DataSource } from 'typeorm';

export const recipeProviders = [
  {
    provide: 'RECIPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Recipes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'RECIPESUBRECIPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RecipesSubrecipes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRICESIZE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PricesSizes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Products),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ORDERPRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OrdersProducts),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'RECIPEINGREDIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RecipesIngredients),
    inject: ['DATA_SOURCE'],
  },
];