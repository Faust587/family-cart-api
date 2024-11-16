import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Cart} from '../../../domain/entities/index';
import {CartSchema} from './CartSchema';

@Entity('cartItem')
export class CartItemSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CartSchema, (cart) => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ default: false, type: 'boolean' })
  isDone: boolean;
}
