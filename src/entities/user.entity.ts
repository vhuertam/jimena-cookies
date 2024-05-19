import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Roles } from './role.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'rut', type: 'text', nullable: true})
  rut: string;

  @Column({name: 'username', type: 'text', nullable: true})
  username: string;

  @Column({name: 'password', type: 'text', nullable: true})
  password: string;

  @Column({name: 'state', type: 'boolean', nullable: true})
  state: boolean;

  @Column({ name: 'id_role', type: 'uuid', nullable: true})
  @JoinColumn({ name: 'id_role' })
  @ManyToOne(() => Roles)
  role: Roles
}
