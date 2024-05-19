import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Ingredient, IngredientData, IngredientDataEdit } from 'src/graphql';
import { IngredientService } from './ingredient.service';

@Resolver('Ingredient')
export class IngredientResolver {
    constructor(
        private ingredientService: IngredientService
    ) {}

    @Query('getIngredients')
    async getIngredients(): Promise<Ingredient[]> {
        return this.ingredientService.getIngredients();
    }

    @Mutation('createIngredient')
    async createIngredient( @Args('input') args: IngredientData ): Promise<Ingredient>{
        return this.ingredientService.createIngredient(args);
    }

    @Mutation('editIngredient')
    async editIngredient( @Args('id') id: string, @Args('input') args: IngredientDataEdit ): Promise<Ingredient> {
        return this.ingredientService.editIngredient(id, args);
    }

    @Mutation('deleteIngredient')
    async deleteIngredient(@Args('id') id: string ): Promise<Ingredient> {
        return this.ingredientService.deleteIngredient(id);
    }
}
