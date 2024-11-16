import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Cart, User} from '../../../domain/entities';
import {CartSchema} from './CartSchema';
import {UserSchema} from './UserSchema';

@Entity()
export class RoleAssignmentSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CartSchema, (cart) => cart.roleAssignments, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => UserSchema, (user) => user.roleAssignments, { onDelete: 'CASCADE' })
  user: User;

  @Column({
    type: 'enum',
    enum: ['OWNER', 'MEMBER'],
    default: 'MEMBER'
  })
  role: 'OWNER' | 'MEMBER';
}
