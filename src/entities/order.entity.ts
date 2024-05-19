import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrdersProducts } from './order_product.entity';
import { Users } from './user.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'client', type: 'text', nullable: true })
  client: string;

  @Column({ name: 'date_delivery', type: 'text', nullable: true })
  dateDelivery: string;

  @Column({ name: 'hour_delivery', type: 'text', nullable: true })
  hourDelivery: string;

  @Column({ name: 'total_price', type: 'float', nullable: true })
  totalPrice: number;

  @Column({ name: 'state', type: 'boolean', nullable: true })
  state: boolean;

  @Column({ name: 'id_user', type: 'uuid', nullable: true})
  @JoinColumn({ name: 'id_user' })
  @ManyToOne(() => Users)
  user: Users

  @OneToMany(() => OrdersProducts, (orderProduct) => orderProduct.order)
  orderProduct: OrdersProducts[]

}
