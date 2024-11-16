import {CartItem} from '../../domain/entities/index';

export interface IUpdateCartItemDoneStatus {
  execute(id: number, activeStatus: boolean): Promise<CartItem>;
}
