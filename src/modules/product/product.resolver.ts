import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Product, ProductData, ProductDataEdit } from 'src/graphql';
import { ProductService } from './product.service';

@Resolver('Product')
export class ProductResolver {
    constructor(
        private productService: ProductService
    ) {}

    @Query('getProducts')
    async getProducts(): Promise<Product[]> {
        return this.productService.getProducts();
    }

    @Mutation('createProduct')
    async createProduct( @Args('input') args: ProductData ): Promise<Product>{
        return this.productService.createProduct(args);
    }

    @Mutation('editProduct')
    async editProduct( @Args('id') id: string, @Args('input') args: ProductDataEdit ): Promise<Product> {
        return this.productService.editProduct(id, args);
    }

    @Mutation('deleteProduct')
    async deleteProduct( @Args('id') id: string ): Promise<Product> {
        return this.productService.deleteProduct(id);
    }
}