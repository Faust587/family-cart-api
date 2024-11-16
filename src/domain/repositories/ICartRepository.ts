import {Cart} from '../entities/index';

export interface ICartRepository {
  create(cart: Cart): Promise<Cart>;
  getAll(): Promise<Cart[]>;
  getById(id: number): Promise<Cart>;
  getByUserId(userId: number): Promise<Cart[]>;
  getOneByName(name: string): Promise<Cart>;
  update(cart: Cart): Promise<Cart>;
  delete(id: number): Promise<Cart>;
}
