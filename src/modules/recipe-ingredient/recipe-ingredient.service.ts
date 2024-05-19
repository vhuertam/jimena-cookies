import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import {
  Recipe,
  RecipeIngredient,
  RecipeIngredientData,
  RecipeIngredientDataEdit,
  Ingredient,
} from 'src/graphql';
import { Repository } from 'typeorm';
import { Recipes, RecipesIngredients, Ingredients } from '../../entities';

@Injectable()
export class RecipeIngredientService {
  constructor(
    @Inject('RECIPEINGREDIENT_REPOSITORY')
    private recipeIngredientRepository: Repository<RecipesIngredients>,
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipes>,
    @Inject('INGREDIENT_REPOSITORY')
    private ingredientRepository: Repository<Ingredients>,
  ) {}

  async getRecipesIngredients(): Promise<RecipesIngredients[]> {
    try {
      return this.recipeIngredientRepository.find({
        relations: [
          'recipe',
          'ingredient',
        ],
        where: {},
      });
    } catch (error) {
      throw error;
    }
  }

  async getRecipeIngredientById(
    id_rec: string,
    id_ing: string,
  ): Promise<RecipesIngredients> {
    try {
      return this.recipeIngredientRepository
        .createQueryBuilder('recipes_ingredients')
        .innerJoinAndSelect("recipes_ingredients.recipe", 'r')
        .innerJoinAndSelect("recipes_ingredients.ingredient", 'i')
        .where('recipes_ingredients.id_recipe = :id_rec', { id_rec })
        .andWhere('recipes_ingredients.id_ingredient = :id_ing', { id_ing })
        .getOne();

    } catch (error) {
      throw error;
    }
  }

  async createRecipeIngredient(
    recipeIngredientData: RecipeIngredientData,
  ): Promise<RecipeIngredient> {
    try {
      const { idRecipe, idIngredient } = recipeIngredientData;

      const recipeById = await this.recipeRepository.findOne({
        where: { id: idRecipe },
      });

      if (!recipeById) {
        throw new HttpException(
          `Recipe con id=${idRecipe} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const ingredientById = await this.ingredientRepository.findOne({
        where: { id: idIngredient },
      });

      if (!ingredientById) {
        throw new HttpException(
          `Ingredient con id=${idIngredient} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const recipeIngredient = new RecipesIngredients();

      recipeIngredient.recipe = recipeById;
      recipeIngredient.ingredient = ingredientById;

      await this.recipeIngredientRepository.save(recipeIngredient);

      return this.getRecipeIngredientById(recipeById.id, ingredientById.id);

    } catch (error) {
      throw error;
    }
  }

  async editRecipeIngredient(
    id_rec: string,
    id_ing: string,
    recipeIngredientDataEdit: RecipeIngredientDataEdit,
  ): Promise<RecipesIngredients> {
    try {
      const recipeIngredient = await this.getRecipeIngredientById(id_rec, id_ing);

      console.log(
        '🚀 ~ file: Recipe-Ingredient.service.ts:94 ~ RecipeIngredientService ~ editRecipeIngredient ~ RecipeIngredient:',
        RecipeIngredient,
      );

      if (!recipeIngredient) {
        throw new HttpException(
          `RecipeIngredient con id_recipe=${id_rec} e id_ingredient=${id_ing} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const { idRecipe, idIngredient } = recipeIngredientDataEdit;

      const recipeById = await this.recipeRepository.findOne({
        where: { id: idRecipe },
      });

      if (!recipeById) {
        throw new HttpException(
          `Recipe con id=${idRecipe} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const ingredientById = await this.ingredientRepository.findOne({
        where: { id: idIngredient },
      });

      if (!ingredientById) {
        throw new HttpException(
          `Ingredient con id=${idIngredient} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const done = await this.recipeIngredientRepository
        .createQueryBuilder()
        .update(RecipesIngredients)
        .set({
          recipe: recipeById,
          ingredient: ingredientById,
        })
        .where('recipes_ingredients.id_recipe = :id_rec', { id_rec })
        .andWhere('recipes_ingredients.id_ingredient = :id_ing', { id_ing })
        .execute();

      console.log(done);

      return await this.getRecipeIngredientById(recipeById.id, ingredientById.id);
    } catch (error) {
      throw error;
    }
  }

    async deleteRecipeIngredient( id_rec: string, id_ing: string ): Promise<RecipesIngredients> {
      try {

          const recipeIngredient = await this.getRecipeIngredientById(id_rec, id_ing);

          if (!recipeIngredient) {
              throw new HttpException(`RecipeIngredient con id_rec=${id_rec} e id_ing=${id_ing} no existe`, HttpStatus.BAD_REQUEST);
          }

          return this.recipeIngredientRepository.remove(recipeIngredient);

      } catch (error) {
          throw error;
      }
    }
}
