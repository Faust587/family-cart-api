import {Cart} from '../../domain/entities/index';

export class CartWithOwner extends Cart {
  constructor(
    public id: number | null,
    public name: string,
    public isOwner: boolean
  ) {
    super(id, name);
  }
}

export interface IGetCartListUseCase {
  execute(userId: number): Promise<CartWithOwner[]>;
}
