import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RecipesSubrecipes, Subrecipes, SubrecipesIngredients } from 'src/entities';
import { Subrecipe, SubrecipeData, SubrecipeDataEdit } from 'src/graphql';
import { Repository } from 'typeorm';

@Injectable()
export class SubrecipeService {
    constructor(
        @Inject('SUBRECIPE_REPOSITORY')
        private subrecipeRepository: Repository<Subrecipes>,
        @Inject('RECIPESUBRECIPE_REPOSITORY')
        private recipeSubrecipeRepository: Repository<RecipesSubrecipes>,
        @Inject('SUBRECIPEINGREDIENT_REPOSITORY')
        private subrecipeIngredientRepository: Repository<SubrecipesIngredients>
    ) {}

    async getSubrecipes(): Promise<Subrecipes[]> {
        try {
            return this.subrecipeRepository.find({
                where: { }
            });
            
        } catch (error) {
            throw error;
        }
    }

    async getSubrecipeById( id: string ): Promise<Subrecipes> {
        try {
            return this.subrecipeRepository.findOne({
                where: { id: id }
            });
            
        } catch (error) {
            throw error;
        }
    }

    async createSubrecipe( subrecipeData: SubrecipeData ): Promise<Subrecipe> {
        try {

            const { description } = subrecipeData;

            if(!description) {
                throw new HttpException(
                    'Parametro description es indefinido',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const subrecipe = new Subrecipes();

            subrecipe.description = description;

            await this.subrecipeRepository.save(subrecipe);

            const subrecipeDone = await this.getSubrecipeById(subrecipe.id);

            return subrecipeDone;

        } catch (error) {
            throw error;
        }
    }

    async editSubrecipe( id: string, subrecipeDataEdit: SubrecipeDataEdit ): Promise<Subrecipes> {
        try {

            const subrecipe = await this.getSubrecipeById(id);

            if(!subrecipe) {
                throw new HttpException(
                    `El Subrecipe con id=${id} no existe`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const { description } = subrecipeDataEdit;

            subrecipe.description = description;
            
            await this.subrecipeRepository.save(subrecipe);

            const subrecipeEdit = await this.getSubrecipeById(id);

            return subrecipeEdit;
            
        } catch (error) {
            throw error;       
        }
    }

    async deleteSubrecipe( id: string ): Promise<Subrecipes> {

        const subrecipe = await this.getSubrecipeById(id);

        if(!subrecipe) {
            throw new HttpException(
                `El Subrecipe con id=${id} no existe`,
                HttpStatus.BAD_REQUEST,
            )
        }

        await this.recipeSubrecipeRepository.createQueryBuilder()
                .delete()
                .from(RecipesSubrecipes)
                .where("recipes_subrecipes.id_subrecipe = :id", {id})
                .execute();

        await this.subrecipeIngredientRepository.createQueryBuilder()
                .delete()
                .from(SubrecipesIngredients)
                .where("subrecipes_ingredients.id_subrecipe = :id", {id})
                .execute();
        
        return this.subrecipeRepository.remove(subrecipe);

    }
}
