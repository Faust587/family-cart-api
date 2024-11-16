import {CartItem} from '../../domain/entities/index';

export interface IAddItemToCartUseCase {
  execute(itemName: string, cartId: number): Promise<CartItem>;
}
