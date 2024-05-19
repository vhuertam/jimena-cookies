import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Ingredients, RecipesIngredients, SubrecipesIngredients } from 'src/entities';
import { Ingredient, IngredientData, IngredientDataEdit } from 'src/graphql';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
    constructor(
        @Inject('INGREDIENT_REPOSITORY')
        private ingredientRepository: Repository<Ingredients>,
        @Inject('RECIPEINGREDIENT_REPOSITORY')
        private recipeIngredientRepository: Repository<RecipesIngredients>,
        @Inject('INGREDIENT_REPOSITORY')
        private subrecipeIngredientRepository: Repository<SubrecipesIngredients>
    ) {}

    async getIngredients(): Promise<Ingredients[]> {
        try {
            return this.ingredientRepository.find({
                where: { }
            });
            
        } catch (error) {
            throw error;
        }
    }

    async getIngredientById( id: string ): Promise<Ingredients> {
        try {
            return this.ingredientRepository.findOne({
                where: { id: id }
            });
            
        } catch (error) {
            throw error;
        }
    }

    async createIngredient( ingredientData: IngredientData ): Promise<Ingredient> {
        try {

            const { name, quantity } = ingredientData;

            if(!name) {
                throw new HttpException(
                    'Parametro description es indefinido',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if(!quantity) {
                throw new HttpException(
                    'Parametro description es indefinido',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const ingredient = new Ingredients();

            ingredient.name = name;
            ingredient.quantity = quantity;

            await this.ingredientRepository.save(ingredient);

            const ingredientDone = await this.getIngredientById(ingredient.id);

            return ingredientDone;

        } catch (error) {
            throw error;
        }
    }

    async editIngredient( id: string, ingredientDataEdit: IngredientDataEdit ): Promise<Ingredients> {
        try {

            const ingredient = await this.getIngredientById(id);

            if(!ingredient) {
                throw new HttpException(
                    `El Ingredient con id=${id} no existe`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const { name, quantity } = ingredientDataEdit;

            ingredient.name = name;
            ingredient.quantity = quantity;
            
            await this.ingredientRepository.save(ingredient);

            const ingredientEdit = await this.getIngredientById(id);

            return ingredientEdit;
            
        } catch (error) {
            throw error;       
        }
    }

    async deleteIngredient( id: string ): Promise<Ingredients> {

        const ingredient = await this.getIngredientById(id);

        if(!ingredient) {
            throw new HttpException(
                `El Ingredient con id=${id} no existe`,
                HttpStatus.BAD_REQUEST,
            )
        }

        await this.recipeIngredientRepository.createQueryBuilder()
                .delete()
                .from(RecipesIngredients)
                .where("recipes_ingredients.id_ingredient = :id", {id})
                .execute();

        await this.subrecipeIngredientRepository.createQueryBuilder()
                .delete()
                .from(SubrecipesIngredients)
                .where("subrecipes_ingredients.id_ingredient = :id", {id})
                .execute();

        return this.ingredientRepository.remove(ingredient);

    }
}
