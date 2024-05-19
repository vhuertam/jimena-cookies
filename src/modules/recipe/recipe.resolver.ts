import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Recipe, RecipeData, RecipeDataEdit } from 'src/graphql';
import { RecipeService } from './recipe.service';

@Resolver('Recipe')
export class RecipeResolver {
    constructor(
        private recipeService: RecipeService
    ) {}

    @Query('getRecipes')
    async getRecipes(): Promise<Recipe[]> {
        return this.recipeService.getRecipes();
    }

    @Mutation('createRecipe')
    async createRecipe( @Args('input') args: RecipeData ): Promise<Recipe>{
        return this.recipeService.createRecipe(args);
    }

    @Mutation('editRecipe')
    async editRecipe( @Args('id') id: string, @Args('input') args: RecipeDataEdit ): Promise<Recipe> {
        return this.recipeService.editRecipe(id, args);
    }

    @Mutation('deleteRecipe')
    async deleteRecipe(@Args('id') id: string ): Promise<Recipe> {
        return this.recipeService.deleteRecipe(id);
    }
}
