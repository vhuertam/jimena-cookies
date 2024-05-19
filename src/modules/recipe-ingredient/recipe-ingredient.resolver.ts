import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { RecipeIngredient, RecipeIngredientData } from "src/graphql";
import { RecipeIngredientService } from "./recipe-ingredient.service";


@Resolver('RecipeIngredient')
export class RecipeIngredientResolver {
  constructor(
    private recipeIngredientService: RecipeIngredientService
  ) {}

  @Query('getRecipesIngredients')
  async getRecipeIngredients(): Promise<RecipeIngredient[]> {
    return this.recipeIngredientService.getRecipesIngredients();
  }

  @Mutation('createRecipeIngredient')
  async createRecipeIngredient(@Args('input') args: RecipeIngredientData): Promise<RecipeIngredient> {
    return this.recipeIngredientService.createRecipeIngredient(args);
  }
  
  @Mutation('editRecipeIngredient')
  async editRecipeIngredient(@Args('id_rec') id_rec: string, @Args('id_ing') id_ing: string, @Args('input') args: RecipeIngredientData): Promise<RecipeIngredient> {
    return this.recipeIngredientService.editRecipeIngredient(id_rec, id_ing, args);
  }

  @Mutation('deleteRecipeIngredient')
  async deleteRecipeIngredient(@Args('id_rec') id_rec: string, @Args('id_ing') id_ing: string): Promise<RecipeIngredient> {
    return this.recipeIngredientService.deleteRecipeIngredient(id_rec, id_ing);
  }

}