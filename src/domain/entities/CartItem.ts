import {Cart} from './Cart';

export class CartItem {
  constructor(
    public id: number | null,
    public cart: Cart,
    public name: string,
    public isDone: boolean,
  ) {}
}
