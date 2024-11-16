import {IsBoolean} from 'class-validator';

export class UpdateItemActiveStatusDTO {
  @IsBoolean()
  status: boolean;

  constructor(cartItemId: number, status: boolean) {
    this.status = status;
  }
}
