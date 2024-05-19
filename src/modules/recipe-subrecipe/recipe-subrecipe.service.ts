import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import {
  Recipe,
  RecipeSubrecipe,
  RecipeSubrecipeData,
  RecipeSubrecipeDataEdit,
  Subrecipe,
} from 'src/graphql';
import { Repository } from 'typeorm';
import { Recipes, RecipesSubrecipes, Subrecipes } from '../../entities';

@Injectable()
export class RecipeSubrecipeService {
  constructor(
    @Inject('RECIPESUBRECIPE_REPOSITORY')
    private recipeSubrecipeRepository: Repository<RecipesSubrecipes>,
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipes>,
    @Inject('SUBRECIPE_REPOSITORY')
    private subrecipeRepository: Repository<Subrecipes>,
  ) {}

  async getRecipesSubrecipes(): Promise<RecipesSubrecipes[]> {
    try {
      return this.recipeSubrecipeRepository.find({
        relations: [
          'recipe',
          'subrecipe',
        ],
        where: {},
      });
    } catch (error) {
      throw error;
    }
  }

  async getRecipeSubrecipeById(
    id_rec: string,
    id_sub: string,
  ): Promise<RecipesSubrecipes> {
    try {
      return this.recipeSubrecipeRepository
        .createQueryBuilder('recipes_subrecipes')
        .innerJoinAndSelect("recipes_subrecipes.recipe", 'r')
        .innerJoinAndSelect("recipes_subrecipes.subrecipe", 's')
        .where('recipes_subrecipes.id_recipe = :id_rec', { id_rec })
        .orWhere('recipes_subrecipes.id_subrecipe = :id_sub', { id_sub })
        .getOne();

    } catch (error) {
      throw error;
    }
  }

  async createRecipeSubrecipe(
    recipeSubrecipeData: RecipeSubrecipeData,
  ): Promise<RecipeSubrecipe> {
    try {
      const { idRecipe, idSubrecipe } = recipeSubrecipeData;

      const recipeById = await this.recipeRepository.findOne({
        where: { id: idRecipe },
      });

      if (!recipeById) {
        throw new HttpException(
          `Recipe con id=${idRecipe} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const subrecipeById = await this.subrecipeRepository.findOne({
        where: { id: idSubrecipe },
      });

      if (!subrecipeById) {
        throw new HttpException(
          `Subrecipe con id=${idSubrecipe} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const recipeSubrecipe = new RecipesSubrecipes();

      recipeSubrecipe.recipe = recipeById;
      recipeSubrecipe.subrecipe = subrecipeById;

      await this.recipeSubrecipeRepository.save(recipeSubrecipe);

      return this.getRecipeSubrecipeById(recipeById.id, subrecipeById.id);

    } catch (error) {
      throw error;
    }
  }

  async editRecipeSubrecipe(
    id_rec: string,
    id_sub: string,
    recipeSubrecipeDataEdit: RecipeSubrecipeDataEdit,
  ): Promise<RecipesSubrecipes> {
    try {
      const recipeSubrecipe = await this.getRecipeSubrecipeById(id_rec, id_sub);

      if (!recipeSubrecipe) {
        throw new HttpException(
          `RecipeSubrecipe con id_recipe=${id_rec} e id_subrecipe=${id_sub} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const { idRecipe, idSubrecipe } = recipeSubrecipeDataEdit;

      const recipeById = await this.recipeRepository.findOne({
        where: { id: idRecipe },
      });

      if (!recipeById) {
        throw new HttpException(
          `Recipe con id=${idRecipe} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const subrecipeById = await this.subrecipeRepository.findOne({
        where: { id: idSubrecipe },
      });

      if (!subrecipeById) {
        throw new HttpException(
          `Subrecipe con id=${idSubrecipe} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const done = await this.recipeSubrecipeRepository
        .createQueryBuilder()
        .update(RecipesSubrecipes)
        .set({
          recipe: recipeById,
          subrecipe: subrecipeById,
        })
        .where('recipes_subrecipes.id_recipe = :id_rec', { id_rec })
        .andWhere('recipes_subrecipes.id_subrecipe = :id_sub', { id_sub })
        .execute();

      console.log(done);

      return await this.getRecipeSubrecipeById(recipeById.id, subrecipeById.id);
    } catch (error) {
      throw error;
    }
  }

    async deleteRecipeSubrecipe( id_rec: string, id_sub: string ): Promise<RecipesSubrecipes> {
      try {

          const recipeSubrecipe = await this.getRecipeSubrecipeById(id_rec, id_sub);

          if (!recipeSubrecipe) {
              throw new HttpException(`RecipeSubrecipe con id_rec=${id_rec} e id_sub=${id_sub} no existe`, HttpStatus.BAD_REQUEST);
          }

          return this.recipeSubrecipeRepository.remove(recipeSubrecipe);

      } catch (error) {
          throw error;
      }
    }
}
