import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Products } from './product.entity';

@Entity()
export class PricesSizes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'price', type: 'float', nullable: true })
  price: number;

  @Column({ name: 'size', type: 'text', nullable: true })
  size: string;

  @Column({ name: 'id_product', type: 'uuid', nullable: true})
  @JoinColumn({ name: 'id_product' })
  @ManyToOne(() => Products)
  product: Products

}
