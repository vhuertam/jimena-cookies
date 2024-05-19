import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Products } from './product.entity';
import { RecipesIngredients } from './recipe_ingredient.entity';
import { RecipesSubrecipes } from './recipe_subrecipe.entity';

@Entity()
export class Recipes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @OneToOne(() => Products, (product) => product.recipe)
  product: Products

  @OneToMany(() => RecipesSubrecipes, (recipeSubrecipe) => recipeSubrecipe.recipe)
  recipeSubrecipe: RecipesSubrecipes[]

  @OneToMany(() => RecipesIngredients, (recipeIngredient) => recipeIngredient.recipe)
  recipeIngredient: RecipesIngredients[]

}
