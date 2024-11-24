import bcrypt from 'bcrypt';
import {IHashingService} from '../../application/interfaces/IHashingService';

export class HashingService implements IHashingService {
  private readonly SALT_ROUNDS = 10;

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }
}
