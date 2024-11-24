import {IUpdateCartItemDoneStatus} from '../interfaces/IUpdateCartItemDoneStatus';
import {CartItem} from '../../domain/entities/index';
import {ICartItemRepository} from '../../domain/repositories/ICartItemRepository';

export class UpdateCartItemDoneStatus implements IUpdateCartItemDoneStatus {
  constructor(private cartItemRepository: ICartItemRepository) {}

  async execute(id: number, activeStatus: boolean): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.getById(id);

    if (!cartItem) {
      throw new Error(`Cart item not found`);
    }

    const cartItemEntity = new CartItem(cartItem.id, cartItem.cart, cartItem.name, activeStatus);
    console.log(cartItemEntity);

    return this.cartItemRepository.update(cartItemEntity);
  }
}
