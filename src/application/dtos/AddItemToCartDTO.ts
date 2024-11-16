import {IsNotEmpty, IsNumber, MinLength} from 'class-validator';

export class AddItemToCartDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(1, { message: 'Name must be at least 1 character' })
  name: string;

  @IsNumber()
  cartId: number;

  constructor(name: string, cartId: number) {
    this.name = name;
    this.cartId = cartId
  }
}
