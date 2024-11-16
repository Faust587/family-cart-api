import {ICartItemRepository} from '../../domain/repositories/ICartItemRepository';
import {CartItem} from '../../domain/entities/index';
import {AppDataSource} from '../database/DatabaseConnection';
import {Repository} from 'typeorm';
import {CartItemSchema} from './models/CartItemSchema';

export class CartItemRepositoryImpl implements ICartItemRepository {
  private ormRepository: Repository<CartItemSchema>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(CartItemSchema);
  }

  async create(cartItem: CartItem): Promise<CartItem> {
    const cartItemEntity = this.ormRepository.create({cart: cartItem.cart, name: cartItem.name, isDone: cartItem.isDone})
    const savedEntity = await this.ormRepository.save(cartItemEntity);
    return new CartItem(savedEntity.id, savedEntity.cart, savedEntity.name, savedEntity.isDone);
  }

  delete(id: number): Promise<CartItem> {
    return Promise.resolve(undefined);
  }

  getAll(): Promise<CartItem[]> {
    return Promise.resolve([]);
  }

  getById(id: number): Promise<CartItem> {
    return this.ormRepository.findOneBy({id});
  }

  getByName(name: string): Promise<CartItem> {
    return this.ormRepository.findOneBy({name});
  }

  async update(cartItem: CartItem): Promise<CartItem> {
    await this.ormRepository.update(cartItem.id, {isDone: cartItem.isDone});
    const updatedCartItem = await this.ormRepository.findOne({ where: {id: cartItem.id}, relations: ['cart'] } );
    return new CartItem(updatedCartItem.id, updatedCartItem.cart, updatedCartItem.name, updatedCartItem.isDone);
  }
}
