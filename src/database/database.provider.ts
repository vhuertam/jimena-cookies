import { 
  Orders,
  OrdersProducts,
  PricesSizes,
  Products,
  Recipes,
  Roles,
  Subrecipes,
  Users,
  Ingredients,
  RecipesSubrecipes,
  RecipesIngredients,
  SubrecipesIngredients,
} from '../entities'

import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';

dotenv.config()

const { DB_USERNAME, DB_HOST, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

const dataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [
    Users,
    Roles,
    Orders,
    Products,
    OrdersProducts,
    Recipes,
    PricesSizes,
    Subrecipes,
    Ingredients,
    RecipesSubrecipes,
    RecipesIngredients,
    SubrecipesIngredients,
],
  synchronize: true,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
