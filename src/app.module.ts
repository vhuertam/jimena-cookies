import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GraphQlModule } from './graphql/graphql.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { OrderProductModule } from './modules/order-product/order-product.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { PriceSizeModule } from './modules/price-size/price-size.module';
import { SubrecipeModule } from './modules/subrecipe/subrecipe.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { RecipeSubrecipeModule } from './modules/recipe-subrecipe/recipe-subrecipe.module';
import { RecipeIngredientModule } from './modules/recipe-ingredient/recipe-ingredient.module';
import { SubrecipeIngredientModule } from './modules/subrecipe-ingredient/subrecipe-ingredient.module';

@Module({
  imports: [
    GraphQlModule,
    DatabaseModule,
    UserModule,
    RoleModule,
    OrderModule,
    ProductModule,
    OrderProductModule,
    RecipeModule,
    PriceSizeModule,
    SubrecipeModule,
    IngredientModule,
    RecipeSubrecipeModule,
    RecipeIngredientModule,
    SubrecipeIngredientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
