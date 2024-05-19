import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Subrecipe, SubrecipeData, SubrecipeDataEdit } from 'src/graphql';
import { SubrecipeService } from './subrecipe.service';

@Resolver('Subrecipe')
export class SubrecipeResolver {
    constructor(
        private subrecipeService: SubrecipeService
    ) {}

    @Query('getSubrecipes')
    async getSubrecipes(): Promise<Subrecipe[]> {
        return this.subrecipeService.getSubrecipes();
    }

    @Mutation('createSubrecipe')
    async createSubrecipe( @Args('input') args: SubrecipeData ): Promise<Subrecipe>{
        return this.subrecipeService.createSubrecipe(args);
    }

    @Mutation('editSubrecipe')
    async editSubrecipe( @Args('id') id: string, @Args('input') args: SubrecipeDataEdit ): Promise<Subrecipe> {
        return this.subrecipeService.editSubrecipe(id, args);
    }

    @Mutation('deleteSubrecipe')
    async deleteSubrecipe(@Args('id') id: string ): Promise<Subrecipe> {
        return this.subrecipeService.deleteSubrecipe(id);
    }
}
