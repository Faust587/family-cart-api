import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  constructor(name: string, email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
