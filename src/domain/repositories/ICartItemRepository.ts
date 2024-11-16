import {CartItem} from '../entities/index';

export interface ICartItemRepository {
  create(cartItem: CartItem): Promise<CartItem>;
  getAll(): Promise<CartItem[]>;
  getById(id: number): Promise<CartItem>;
  getByName(name: string): Promise<CartItem>;
  update(cartItem: CartItem): Promise<CartItem>;
  delete(id: number): Promise<CartItem>;
}
