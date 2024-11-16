import {Cart} from '../../domain/entities';

export interface IDeleteCartUseCase {
  execute(userId, cartId: number): Promise<Cart>;
}
