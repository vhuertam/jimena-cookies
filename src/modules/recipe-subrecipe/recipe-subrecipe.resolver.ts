import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { RecipeSubrecipe, RecipeSubrecipeData } from "src/graphql";
import { RecipeSubrecipeService } from "./recipe-subrecipe.service";


@Resolver('RecipeSubrecipe')
export class RecipeSubrecipeResolver {
  constructor(
    private recipeSubrecipeService: RecipeSubrecipeService
  ) {}

  @Query('getRecipesSubrecipes')
  async getRecipeSubrecipes(): Promise<RecipeSubrecipe[]> {
    return this.recipeSubrecipeService.getRecipesSubrecipes();
  }

  @Mutation('createRecipeSubrecipe')
  async createRecipeSubrecipe(@Args('input') args: RecipeSubrecipeData): Promise<RecipeSubrecipe> {
    return this.recipeSubrecipeService.createRecipeSubrecipe(args);
  }
  
  @Mutation('editRecipeSubrecipe')
  async editRecipeSubrecipe(@Args('id_rec') id_rec: string, @Args('id_sub') id_sub: string, @Args('input') args: RecipeSubrecipeData): Promise<RecipeSubrecipe> {
    return this.recipeSubrecipeService.editRecipeSubrecipe(id_rec, id_sub, args);
  }

  @Mutation('deleteRecipeSubrecipe')
  async deleteRecipeSubrecipe(@Args('id_rec') id_rec: string, @Args('id_sub') id_sub: string): Promise<RecipeSubrecipe> {
    return this.recipeSubrecipeService.deleteRecipeSubrecipe(id_rec, id_sub);
  }

}