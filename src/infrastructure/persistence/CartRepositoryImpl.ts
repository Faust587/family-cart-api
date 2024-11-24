import {ICartRepository} from '../../domain/repositories/ICartRepository';
import {Cart} from '../../domain/entities';
import {Repository} from 'typeorm';
import {AppDataSource} from '../database/DatabaseConnection';
import {CartSchema} from './models/CartSchema';

export class CartRepositoryImpl implements ICartRepository {
  private ormRepository: Repository<CartSchema>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(CartSchema);
  }

  async create(cart: Cart): Promise<Cart> {
    const cartEntity = this.ormRepository.create({
      name: cart.name,
    })

    const savedEntity = await this.ormRepository.save(cartEntity);
    return new Cart(savedEntity.id, savedEntity.name);
  }

  async delete(id: number): Promise<Cart> {
    const cart = await this.ormRepository.findOne({where: {id: id}});

    if (cart) {
      await this.ormRepository.remove(cart);
    }

    return new Cart(cart.id, cart.name);
  }

  async getAll(): Promise<Cart[]> {
    const carts = await this.ormRepository.find();

    return carts.map(cart => new Cart(cart.id, cart.name));
  }

  getById(id: number): Promise<Cart> {
    return this.ormRepository.findOneBy({id})
  }

  getOneByName(name: string): Promise<Cart> {
    return this.ormRepository.findOneBy({name})
  }

  async update(cart: Cart): Promise<Cart> {
    const updatedEntity = await this.ormRepository.save(cart);
    return new Cart(updatedEntity.id, updatedEntity.name);
  }

  getByUserId(userId: number): Promise<Cart[]> {
    return Promise.resolve([]);
  }
}
