import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import {
  Order,
  OrderProduct,
  OrderProductData,
  OrderProductDataEdit,
  Product,
} from 'src/graphql';
import { Repository } from 'typeorm';
import { Orders, OrdersProducts, Products } from '../../entities';

@Injectable()
export class OrderProductService {
  constructor(
    @Inject('ORDERPRODUCT_REPOSITORY')
    private orderProductRepository: Repository<OrdersProducts>,
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Orders>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Products>,
  ) {}

  async getOrdersProducts(): Promise<OrdersProducts[]> {
    try {
      return this.orderProductRepository.find({
        relations: [
          'order',
          'order.user',
          'order.user.role',
          'product',
          'product.recipe',
        ],
        where: {},
      });
    } catch (error) {
      throw error;
    }
  }

  async getOrderProductById(
    id_ord: string,
    id_pro: string,
  ): Promise<OrdersProducts> {
    try {
      // return this.orderProductRepository.findOne({
      //     relations: ['order',
      //                 'order.user',
      //                 'order.user.role',
      //                 'product',
      //                 'product.recipe'],
      //     where: { order:{ id : id_ord }, product:{ id : id_pro } }
      // });

      return this.orderProductRepository
        .createQueryBuilder('orders_products')
        .innerJoinAndSelect("orders_products.order", 'o')
        .innerJoinAndSelect("orders_products.product", 'p')
        .innerJoinAndSelect("o.user", 'u')
        .innerJoinAndSelect("u.role", 'r')
        .innerJoinAndSelect("p.recipe", 're')
        .where('orders_products.id_order = :id_ord', { id_ord })
        .andWhere('orders_products.id_product = :id_pro', { id_pro })
        .getOne();

    } catch (error) {
      throw error;
    }
  }

  async createOrderProduct(
    orderProductData: OrderProductData,
  ): Promise<OrderProduct> {
    try {
      const { idOrder, idProduct } = orderProductData;

      const orderById = await this.orderRepository.findOne({
        relations: ['user', 'user.role'],
        where: { id: idOrder },
      });

      if (!orderById) {
        throw new HttpException(
          `Order con id=${idOrder} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const productById = await this.productRepository.findOne({
        relations: ['recipe'],
        where: { id: idProduct },
      });

      if (!productById) {
        throw new HttpException(
          `Product con id=${idProduct} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const orderProduct = new OrdersProducts();

      orderProduct.order = orderById;
      orderProduct.product = productById;

      const done = await this.orderProductRepository.save(orderProduct);

      return done;
    } catch (error) {
      throw error;
    }
  }

  async editOrderProduct(
    id_ord: string,
    id_pro: string,
    orderProductDataEdit: OrderProductDataEdit,
  ): Promise<OrdersProducts> {
    try {
      const orderProduct = await this.getOrderProductById(id_ord, id_pro);

      console.log(
        '🚀 ~ file: order-product.service.ts:94 ~ OrderProductService ~ editOrderProduct ~ orderProduct:',
        orderProduct,
      );

      if (!orderProduct) {
        throw new HttpException(
          `OrderProduct con id=${id_ord} e id=${id_pro} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const { idOrder, idProduct } = orderProductDataEdit;

      const orderById = await this.orderRepository.findOne({
        where: { id: idOrder },
      });

      if (!orderById) {
        throw new HttpException(
          `Order con id=${idOrder} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const productById = await this.productRepository.findOne({
        where: { id: idProduct },
      });

      if (!productById) {
        throw new HttpException(
          `Product con id=${idProduct} no existe`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const done = await this.orderProductRepository
        .createQueryBuilder()
        .update(OrdersProducts)
        .set({
          order: orderById,
          product: productById,
        })
        .where('orders_products.id_order = :id_ord', { id_ord })
        .andWhere('orders_products.id_product = :id_pro', { id_pro })
        .execute();

      console.log(done);

      return await this.getOrderProductById(orderById.id, productById.id);
    } catch (error) {
      throw error;
    }
  }

    async deleteOrderProduct( id_ord: string, id_pro: string ): Promise<OrdersProducts> {
      try {

          const orderProduct = await this.getOrderProductById(id_ord, id_pro);

          if (!orderProduct) {
              throw new HttpException(`OrderProduct con id_ord=${id_ord} e id_pro=${id_pro} no existe`, HttpStatus.BAD_REQUEST);
          }

          return this.orderProductRepository.remove(orderProduct);

      } catch (error) {
          throw error;
      }
    }
}