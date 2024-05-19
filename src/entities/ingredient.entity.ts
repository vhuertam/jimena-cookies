import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { RecipesIngredients } from './recipe_ingredient.entity';
import { SubrecipesIngredients } from './subrecipe_ingredient.entity';

@Entity()
export class Ingredients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'text', nullable: true })
  name: string;

  @Column({ name: 'quantity', type: 'text', nullable: true })
  quantity: string;

  @OneToMany(() => RecipesIngredients, (recipeIngredient) => recipeIngredient.ingredient)
  recipeIngredient: RecipesIngredients[]
  
  @OneToMany(() => SubrecipesIngredients, (subrecipeIngredient) => subrecipeIngredient.ingredient)
  subrecipeIngredient: SubrecipesIngredients[]

}
