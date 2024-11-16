import {Cart} from '../../domain/entities';

export interface IDeleteCart {
  execute(userId: number, cartId: number): Promise<Cart>;
}
