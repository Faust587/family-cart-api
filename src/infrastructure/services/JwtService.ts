import jwt from 'jsonwebtoken';
import {IJwtService} from '../../application/interfaces/IJwtService';

export class JwtService implements IJwtService {
  private readonly secretKey: string;
  private readonly expiresIn: string;

  constructor() {
    this.secretKey = process.env.JWT_SECRET;
    this.expiresIn = '1d';
  }

  public generateToken(payload: object): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  public verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      console.log('Invalid token', error);
      return null;
    }
  }
}
