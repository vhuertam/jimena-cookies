import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { OrderProduct, OrderProductData } from "src/graphql";
import { OrderProductService } from "./order-product.service";


@Resolver('OrderProduct')
export class OrderProductResolver {
  constructor(
    private orderProductService: OrderProductService
  ) {}

  @Query('getOrdersProducts')
  async getOrderProducts(): Promise<OrderProduct[]> {
    return this.orderProductService.getOrdersProducts();
  }

  @Mutation('createOrderProduct')
  async createOrderProduct(@Args('input') args: OrderProductData): Promise<OrderProduct> {
    return this.orderProductService.createOrderProduct(args);
  }
  
  @Mutation('editOrderProduct')
  async editOrderProduct(@Args('id_ord') id_ord: string, @Args('id_pro') id_pro: string, @Args('input') args: OrderProductData): Promise<OrderProduct> {
    return this.orderProductService.editOrderProduct(id_ord, id_pro, args);
  }

  @Mutation('deleteOrderProduct')
  async deleteOrderProduct(@Args('id_ord') id_ord: string, @Args('id_pro') id_pro: string): Promise<OrderProduct> {
    return this.orderProductService.deleteOrderProduct(id_ord, id_pro);
  }

}
