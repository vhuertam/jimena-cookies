import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import {
  Recipe,
  SubrecipeIngredient,
  SubrecipeIngredientData,
  SubrecipeIngredientDataEdit,
  Subrecipe,
} from 'src/graphql';
import { Repository } from 'typeorm';
import { Recipes, SubrecipesIngredients, Subrecipes, Ingredients } from '../../entities';

@Injectable()
export class SubrecipeIngredientService {
  constructor(
    @Inject('SUBRECIPEINGREDIENT_REPOSITORY')
    private subrecipeIngredientRepository: Repository<SubrecipesIngredients>,
    @Inject('INGREDIENT_REPOSITORY')
    private ingredientRepository: Repository<Ingredients>,
    @Inject('SUBRECIPE_REPOSITORY')
    private subrecipeRepository: Repository<Subrecipes>,
  ) {}

  async getSubrecipesIngredients(): Promise<SubrecipesIngredients[]> {
    try {
      return this.subrecipeIngredientRepository.find({
        relations: [
          'ingredient',
          'subrecipe',
        ],
        where: {},
      });
    } catch (error) {
      throw error;
    }
  }

  async getSubrecipeIngredientById(
    id_sub: string,
    id_ing: string,
  ): Promise<SubrecipesIngredients> {
    try {
      return this.subrecipeIngredientRepository
        .createQueryBuilder('subrecipes_ingredients')
        .innerJoinAndSelect("subrecipes_ingredients.ingredient", 'i')
        .innerJoinAndSelect("subrecipes_ingredients.subrecipe", 's')
        .where('subrecipes_ingredients.id_subrecipe = :id_sub', { id_sub })
        .orWhere('subrecipes_ingredients.id_ingredient = :id_ing', { id_ing })
        .getOne();

    } catch (error) {
      throw error;
    }
  }

  async createSubrecipeIngredient(
    subrecipeIngredientData: SubrecipeIngredientData,
  ): Promise<SubrecipeIngredient> {
    try {
      const { idIngredient, idSubrecipe } = subrecipeIngredientData;

      const ingredientById = await this.ingredientRepository.findOne({
        where: { id: idIngredient },
      });

      if (!ingredientById) {
        throw new HttpException(
          `Ingredient con id=${idIngredient} no existe`,
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

      const subrecipeIngredient = new SubrecipesIngredients();

      subrecipeIngredient.ingredient = ingredientById;
      subrecipeIngredient.subrecipe = subrecipeById;

      await this.subrecipeIngredientRepository.save(subrecipeIngredient);

      return this.getSubrecipeIngredientById(subrecipeById.id, ingredientById.id);

    } catch (error) {
      throw error;
    }
  }

  async editSubrecipeIngredient(
    id_sub: string,
    id_ing: string,
    subrecipeIngredientDataEdit: SubrecipeIngredientDataEdit,
  ): Promise<SubrecipesIngredients> {
    try {
      const subrecipeIngredient = await this.getSubrecipeIngredientById(id_sub, id_ing);

      console.log(
        '🚀 ~ file: Recipe-subrecipe.service.ts:94 ~ SubrecipeIngredientService ~ editSubrecipeIngredient ~ SubrecipeIngredient:',
        SubrecipeIngredient,
      );

      if (!subrecipeIngredient) {
        throw new HttpException(
          `SubrecipeIngredient con id_subrecipe=${id_sub} e id_ingredient=${id_ing} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const { idIngredient, idSubrecipe } = subrecipeIngredientDataEdit;

      const ingredientById = await this.ingredientRepository.findOne({
        where: { id: idIngredient },
      });

      if (!ingredientById) {
        throw new HttpException(
          `Ingredient con id=${idIngredient} no existe`,
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

      const done = await this.subrecipeIngredientRepository
        .createQueryBuilder()
        .update(SubrecipesIngredients)
        .set({
          subrecipe: subrecipeById,
          ingredient: ingredientById,
        })
        .where('subrecipes_ingredients.id_subrecipe = :id_sub', { id_sub })
        .andWhere('subrecipes_ingredients.id_ingredient = :id_ing', { id_ing })
        .execute();

      console.log(done);

      return await this.getSubrecipeIngredientById(subrecipeById.id, ingredientById.id);
    } catch (error) {
      throw error;
    }
  }

    async deleteSubrecipeIngredient( id_sub: string, id_ing: string ): Promise<SubrecipesIngredients> {
      try {

          const subrecipeIngredient = await this.getSubrecipeIngredientById( id_sub, id_ing );

          if (!subrecipeIngredient) {
              throw new HttpException(`SubrecipeIngredient con id_sub=${id_sub} e id_ing=${id_ing} no existe`, HttpStatus.BAD_REQUEST);
          }

          return this.subrecipeIngredientRepository.remove(subrecipeIngredient);

      } catch (error) {
          throw error;
      }
    }
}
