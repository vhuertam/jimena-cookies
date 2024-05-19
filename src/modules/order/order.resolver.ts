import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { Order, OrderData } from "src/graphql";
import { OrderService } from "./order.service";


@Resolver('Order')
export class OrderResolver {
  constructor(
    private orderService: OrderService
  ) {}

  @Query('getOrders')
  async getOrders(): Promise<Order[]> {
    return this.orderService.getOrders();
  }

  @Mutation('createOrder')
  async createOrder(@Args('input') args: OrderData): Promise<Order> {
    return this.orderService.createOrder(args);
  }
  
  @Mutation('editOrder')
  async editOrder(@Args('id') id: string, @Args('input') args: OrderData): Promise<Order> {
    return this.orderService.editOrder(id, args);
  }

  @Mutation('deleteOrder')
  async deleteOrder(@Args('id') id: string): Promise<Order> {
    return this.orderService.deleteOrder(id);
  }

}
