import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OrdersProducts, PricesSizes, Products, Recipes } from 'src/entities';
import { Product, ProductData, ProductDataEdit } from 'src/graphql';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Products>,
        @Inject('RECIPE_REPOSITORY')
        private recipeRepository: Repository<Recipes>,
        @Inject('PRICESIZE_REPOSITORY')
        private priceSizeRepository: Repository<PricesSizes>,
        @Inject('ORDERPRODUCT_REPOSITORY')
        private orderProductRepository: Repository<OrdersProducts>
    ) {}

    async getProducts(): Promise<Products[]> {
        try {
            return this.productRepository.find({
                relations: ['recipe'],
                where: { }
            });
            
        } catch (error) {
            throw error;
        }
    }

    async getProductById( id: string ): Promise<Products> {
        try {
            return this.productRepository.findOne({
                relations: ['recipe'],
                where: { id: id }
            });
            
        } catch (error) {
            throw error;
        }
    }

    async createProduct( productData: ProductData ): Promise<Product> {
        try {

            const { name, idRecipe } = productData;

            if(!name) {
                throw new HttpException(
                    'Parametro name es indefinido',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if(!idRecipe) {
                throw new HttpException(
                    'Parametro idRecipe es indefinido',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const recipe = await this.recipeRepository.findOne({
                where: { id: idRecipe }
            })

            if(!recipe){
                throw new HttpException(
                    `El recipe con id=${idRecipe} no existe`,
                    HttpStatus.BAD_REQUEST,
                )
            }

            const product = new Products();

            product.name = name;
            product.recipe = recipe;

            await this.productRepository.save(product);

            const productDone = await this.getProductById(product.id);

            return productDone;

        } catch (error) {
            throw error;
        }
    }

    async editProduct( id: string, productDataEdit: ProductDataEdit ): Promise<Products> {
        try {

            const product = await this.getProductById(id);

            if(!product) {
                throw new HttpException(
                    `El product con id=${id} no existe`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const { name, idRecipe } = productDataEdit;

            const recipe = await this.recipeRepository.findOne({
                where: { id: idRecipe }
            })

            if(!recipe){
                throw new HttpException(
                    `El recipe con id=${idRecipe} no existe`,
                    HttpStatus.BAD_REQUEST,
                )
            }

            product.name = name;
            product.recipe = recipe;
            
            await this.productRepository.save(product);

            const productEdit = await this.getProductById(id);

            return productEdit;
            
        } catch (error) {
            throw error;       
        }
    }

    async deleteProduct( id: string ): Promise<Products> {

        const product = await this.getProductById(id);

        if(!product) {
            throw new HttpException(
                `El product con id=${id} no existe`,
                HttpStatus.BAD_REQUEST,
            )
        }

        await this.priceSizeRepository.createQueryBuilder()
                .delete()
                .from(PricesSizes)
                .where("prices_sizes.id_product = :id", { id })
                .execute();

        await this.orderProductRepository.createQueryBuilder()
                .delete()
                .from(OrdersProducts)
                .where("orders_products.id_product = :id", { id })
                .execute();      

        return this.productRepository.remove(product);

    }
}
