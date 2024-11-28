import {ICartItemRepository} from '../../domain/repositories/ICartItemRepository';
import {Cart, CartItem, User} from '../../domain/entities/index';
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

  async delete(id: number): Promise<CartItem> {
    const item = await this.ormRepository.findOne({where: {id: id}});

    if (item) {
      await this.ormRepository.remove(item);
    }

    return new CartItem(item.id, item.cart, item.name, item.isDone);
  }

  getAll(): Promise<CartItem[]> {
    return Promise.resolve([]);
  }

  async getById(id: number): Promise<CartItem> {
    const itemEntity = await this.ormRepository.findOne({
      where: { id },
      relations: ['cart'],
    });

    if (!itemEntity) {
      return null;
    }

    return new CartItem(itemEntity.id, itemEntity.cart, itemEntity.name, itemEntity.isDone);
  }

  getByName(name: string): Promise<CartItem> {
    return this.ormRepository.findOneBy({name});
  }

  async update(cartItem: CartItem): Promise<CartItem> {
    await this.ormRepository.update(cartItem.id, {isDone: cartItem.isDone});
    const updatedCartItem = await this.ormRepository.findOne({ where: {id: cartItem.id}, relations: ['cart'] } );
    return new CartItem(updatedCartItem.id, updatedCartItem.cart, updatedCartItem.name, updatedCartItem.isDone);
  }

  async getByCartId(id: number): Promise<CartItem[]> {
    const cartItems = await this.ormRepository.find({where: {
        cart: {
          id: id,
        },
      }, relations: ['cart']});

    return cartItems.map(item => new CartItem(item.id, item.cart, item.name, item.isDone));
  }
}
