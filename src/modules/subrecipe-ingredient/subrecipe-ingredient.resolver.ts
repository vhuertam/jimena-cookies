import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { SubrecipeIngredient, SubrecipeIngredientData } from "src/graphql";
import { SubrecipeIngredientService } from "./subrecipe-ingredient.service";


@Resolver('SubrecipeIngredient')
export class SubrecipeIngredientResolver {
  constructor(
    private subrecipeIngredientService: SubrecipeIngredientService
  ) {}

  @Query('getSubrecipesIngredients')
  async getSubrecipeIngredients(): Promise<SubrecipeIngredient[]> {
    return this.subrecipeIngredientService.getSubrecipesIngredients();
  }

  @Mutation('createSubrecipeIngredient')
  async createSubrecipeIngredient(@Args('input') args: SubrecipeIngredientData): Promise<SubrecipeIngredient> {
    return this.subrecipeIngredientService.createSubrecipeIngredient(args);
  }
  
  @Mutation('editSubrecipeIngredient')
  async editSubrecipeIngredient(@Args('id_sub') id_sub: string, @Args('id_ing') id_ing: string, @Args('input') args: SubrecipeIngredientData): Promise<SubrecipeIngredient> {
    return this.subrecipeIngredientService.editSubrecipeIngredient(id_sub, id_ing, args);
  }

  @Mutation('deleteSubrecipeIngredient')
  async deleteSubrecipeIngredient(@Args('id_sub') id_sub: string, @Args('id_ing') id_ing: string): Promise<SubrecipeIngredient> {
    return this.subrecipeIngredientService.deleteSubrecipeIngredient(id_sub, id_ing);
  }

}