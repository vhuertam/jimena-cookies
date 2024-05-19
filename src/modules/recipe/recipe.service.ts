import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OrdersProducts, PricesSizes, Products, Recipes, RecipesIngredients, RecipesSubrecipes } from 'src/entities';
import { PriceSize, Recipe, RecipeData, RecipeDataEdit } from 'src/graphql';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
    constructor(
        @Inject('RECIPE_REPOSITORY')
        private recipeRepository: Repository<Recipes>,
        @Inject('RECIPESUBRECIPE_REPOSITORY')
        private recipeSubrecipeRepository: Repository<RecipesSubrecipes>,
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Products>,
        @Inject('PRICESIZE_REPOSITORY')
        private priceSizeRepository: Repository<PricesSizes>,
        @Inject('ORDERPRODUCT_REPOSITORY')
        private orderProductRepository: Repository<OrdersProducts>,
        @Inject('RECIPEINGREDIENT_REPOSITORY')
        private recipeIngredientRepository: Repository<OrdersProducts>
    ) {}

    async getRecipes(): Promise<Recipes[]> {
        try {
            return this.recipeRepository.find({
                where: { }
            });
            
        } catch (error) {
            throw error;
        }
    }

    async getRecipeById( id: string ): Promise<Recipes> {
        try {
            return this.recipeRepository.findOne({
                where: { id: id }
            });
            
        } catch (error) {
            throw error;
        }
    }

    async createRecipe( recipeData: RecipeData ): Promise<Recipe> {
        try {

            const { description } = recipeData;

            if(!description) {
                throw new HttpException(
                    'Parametro description es indefinido',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const recipe = new Recipes();

            recipe.description = description;

            await this.recipeRepository.save(recipe);

            const recipeDone = await this.getRecipeById(recipe.id);

            return recipeDone;

        } catch (error) {
            throw error;
        }
    }

    async editRecipe( id: string, recipeDataEdit: RecipeDataEdit ): Promise<Recipes> {
        try {

            const recipe = await this.getRecipeById(id);

            if(!recipe) {
                throw new HttpException(
                    `El recipe con id=${id} no existe`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const { description } = recipeDataEdit;

            recipe.description = description;
            
            await this.recipeRepository.save(recipe);

            const recipeEdit = await this.getRecipeById(id);

            return recipeEdit;
            
        } catch (error) {
            throw error;       
        }
    }

    async deleteRecipe( id: string ): Promise<Recipes> {

        const recipe = await this.getRecipeById(id);

        if(!recipe) {
            throw new HttpException(
                `El recipe con id=${id} no existe`,
                HttpStatus.BAD_REQUEST,
            )
        }

        const product = await this.productRepository.findOne({
            where:{ recipe: { id: recipe.id } }
        })

        if(!product) {
            throw new HttpException(
                `El product con id=${product.id} no existe`,
                HttpStatus.BAD_REQUEST,
            )
        }

        await this.priceSizeRepository.createQueryBuilder()
                .delete()
                .from(PricesSizes)
                .where("prices_sizes.id_product = :id_pro", { id_pro: product.id })
                .execute();

        await this.orderProductRepository.createQueryBuilder()
                .delete()
                .from(OrdersProducts)
                .where("orders_products.id_product = :id_pro", { id_pro: product.id })
                .execute();      

        await this.recipeSubrecipeRepository.createQueryBuilder()
                .delete()
                .from(RecipesSubrecipes)
                .where("recipes_subrecipes.id_recipe = :id", {id})
                .execute();

        await this.recipeIngredientRepository.createQueryBuilder()
                .delete()
                .from(RecipesIngredients)
                .where("recipes_ingredients.id_recipe = :id", {id})
                .execute();

        await this.productRepository.createQueryBuilder()
                .delete()
                .from(Products)
                .where("products.id_recipe = :id", {id})
                .execute();

        return this.recipeRepository.remove(recipe);
    }
}