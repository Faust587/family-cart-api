import { IsNumber } from 'class-validator';

export class AddUserToCartDTO {
  @IsNumber()
  userId: number;

  @IsNumber()
  cartId: number;

  constructor(userId: number, cartId: number) {
    this.userId = userId;
    this.cartId = cartId
  }
}
