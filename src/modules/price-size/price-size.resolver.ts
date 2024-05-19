import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { PriceSize, PriceSizeData } from "src/graphql";
import { PriceSizeService } from "./price-size.service";


@Resolver('PriceSize')
export class PriceSizeResolver {
  constructor(
    private priceSizeService: PriceSizeService
  ) {}

  @Query('getPricesSizes')
  async getPricesSizes(): Promise<PriceSize[]> {
    return this.priceSizeService.getPricesSizes();
  }

  @Mutation('createPriceSize')
  async createPriceSize(@Args('input') args: PriceSizeData): Promise<PriceSize> {
    return this.priceSizeService.createPriceSize(args);
  }
  
  @Mutation('editPriceSize')
  async editPriceSize(@Args('id') id: string, @Args('input') args: PriceSizeData): Promise<PriceSize> {
    return this.priceSizeService.editPriceSize(id, args);
  }

  @Mutation('deletePriceSize')
  async deletePriceSize(@Args('id') id: string): Promise<PriceSize> {
    return this.priceSizeService.deletePriceSize(id);
  }

}
