import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { OrdersProducts } from './order_product.entity';
import { PricesSizes } from './priceSize.entity';
import { Recipes } from './recipe.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'text', nullable: true })
  name: string;

  @OneToOne(() => Recipes, (recipe) => recipe.product)
  @JoinColumn({ name: 'id_recipe' })
  recipe: Recipes

  @OneToMany(() => OrdersProducts, (orderProduct) => orderProduct.product)
  orderProduct: OrdersProducts[]
  
  @OneToMany(() => PricesSizes, (priceSize) => priceSize.product)
  priceSize: PricesSizes[]
}