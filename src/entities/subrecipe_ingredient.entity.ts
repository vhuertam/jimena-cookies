import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Subrecipes } from './subrecipe.entity';
import { Ingredients } from './ingredient.entity';

@Entity()
export class SubrecipesIngredients {
    
    @Column({ name: 'id_subrecipe', type: 'uuid', primary: true })
    @JoinColumn({ name: 'id_subrecipe'})
    @ManyToOne(() => Subrecipes)
    subrecipe: Subrecipes

    @Column({ name: 'id_ingredient', type: 'uuid', primary: true })
    @JoinColumn({ name: 'id_ingredient'})
    @ManyToOne(() => Ingredients)
    ingredient: Ingredients

}