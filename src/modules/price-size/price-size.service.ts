import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PriceSize, PriceSizeData, PriceSizeDataEdit } from 'src/graphql';
import { Repository } from 'typeorm';
import { PricesSizes, Products } from '../../entities';

@Injectable()
export class PriceSizeService {
  constructor(
    @Inject('PRICESIZE_REPOSITORY')
    private priceSizeRepository: Repository<PricesSizes>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Products>,
  ) {}

  async getPricesSizes(): Promise<PricesSizes[]> {
    try {
        return this.priceSizeRepository.find({
            relations: ['product', 'product.recipe'],
            where: { }
        });
    } catch (error) {
        throw error;        
    }
  }

  async getPriceSizeById( id: string ): Promise<PricesSizes> {
    try {
        return this.priceSizeRepository.findOne({
            relations: ['product', 'product.recipe'],
            where: { id: id }
        })
    } catch (error) {
        throw error;
    }
  }

    
  async createPriceSize( priceSizeData: PriceSizeData ): Promise<PriceSize> {
    try {
        const { price, size, idProduct } = priceSizeData;

        if (!price) {
          throw new HttpException(
              'Parametro price es indefinido',
              HttpStatus.BAD_REQUEST,
          );
        }

        if (!size) {
          throw new HttpException(
              'Parametro size es indefinido',
              HttpStatus.BAD_REQUEST,
          );
        }

        if (!idProduct) {
          throw new HttpException(
              'Parametro idProduct es indefinido',
              HttpStatus.BAD_REQUEST,
          );
        }
 
        // const priceSizeById = await this.getPriceSizeByClient(client);

        // if (PriceSizeByClient) {
        //   throw new HttpException(
        //       `PriceSize con cliente ${client} existe`,
        //       HttpStatus.BAD_REQUEST, 
        //   );
        // }

        const productById = await this.productRepository.findOne({
            relations:[ 'recipe' ],
            where:{ id: idProduct }
        });

        if (!productById) {
            throw new HttpException(
                `Product con id ${idProduct} no existe`,
                HttpStatus.BAD_REQUEST, 
            );
        }

        const priceSize = new PriceSize();

        priceSize.price = price;
        priceSize.size = size;
        priceSize.product = productById;

        await this.priceSizeRepository.save(priceSize);

        const priceSizeDone = await this.getPriceSizeById(priceSize.id);

        return priceSizeDone;

    } catch (error) {
        throw error;
        
    }
  }

  async editPriceSize( id: string, priceSizeDataEdit: PriceSizeDataEdit ): Promise<PricesSizes> {
    try {

        const priceSize = await this.getPriceSizeById(id);

        if (!priceSize) {
            throw new HttpException(`PriceSize con id=${id} no existe`, HttpStatus.BAD_REQUEST);
        }

        const { price, size, idProduct } = priceSizeDataEdit;

        const productById = await this.productRepository.findOne({
            relations: ['recipe'],
            where:{ id: idProduct }
        })

        priceSize.price = price;
        priceSize.size = size;
        priceSize.product = productById;

        return this.priceSizeRepository.save(priceSize);

    } catch (error) {
        throw error;
    }
  }

  async deletePriceSize( id: string ): Promise<PricesSizes> {
    try {

        const priceSize = await this.getPriceSizeById(id);

        if (!priceSize) {
            throw new HttpException(`PriceSize con id=${id} no existe`, HttpStatus.BAD_REQUEST);
        }

        return this.priceSizeRepository.remove(priceSize);
        
    } catch (error) {
        throw error;
    }
  }
}