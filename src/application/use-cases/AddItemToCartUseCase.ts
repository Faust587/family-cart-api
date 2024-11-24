import {IAddItemToCartUseCase} from '../interfaces/IAddItemToCartUseCase';
import {CartItem} from '../../domain/entities/index';
import {ICartItemRepository} from '../../domain/repositories/ICartItemRepository';
import {ICartRepository} from '../../domain/repositories/ICartRepository';

export class AddItemToCartUseCase implements IAddItemToCartUseCase {
  constructor(private cartItemRepository: ICartItemRepository,
              private cartRepository: ICartRepository) {}

  async execute(itemName: string, cartId: number): Promise<CartItem> {
    const isItemNameExists = await this.cartItemRepository.getByName(itemName);
    if (isItemNameExists) {
      throw new Error("Item already exists");
    }

    const cart = await this.cartRepository.getById(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const cartItemEntity = new CartItem(null,  cart, itemName, false);
    const savedEntity = await this.cartItemRepository.create(cartItemEntity);

    return new CartItem(savedEntity.id, savedEntity.cart, savedEntity.name, savedEntity.isDone);
  }

}
