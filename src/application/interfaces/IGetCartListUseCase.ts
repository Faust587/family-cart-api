import {Cart, CartItem} from '../../domain/entities/index';

export class CartWithOwnerAndMembers extends Cart {
  constructor(
    public id: number | null,
    public name: string,
    public isOwner: boolean,
    public items: {
      id: number | null,
      cart: Cart,
      name: string,
      isDone: boolean
    }[],
    public members: {
      id: number | null,
      email: string,
      name: string,
      owner: 'MEMBER' | 'OWNER',
    }[]
  ) {
    super(id, name);
  }
}

export interface IGetCartListUseCase {
  execute(userId: number): Promise<CartWithOwnerAndMembers[]>;
}
