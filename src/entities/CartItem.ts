import {Cart} from './Cart';

export class CartItem {
  constructor(
    public id: string | null,
    public cart: Cart,
    public name: string,
    public isDone: boolean,
  ) {}
}
