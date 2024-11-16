import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCartDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(1, { message: 'Name must be at least 1 character' })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
