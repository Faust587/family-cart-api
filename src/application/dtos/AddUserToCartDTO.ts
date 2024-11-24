import {IsEmail, IsNumber} from 'class-validator';

export class AddUserToCartDTO {
  @IsEmail()
  email: number;

  @IsNumber()
  cartId: number;

  constructor(userId: number, cartId: number) {
    this.email = userId;
    this.cartId = cartId
  }
}
