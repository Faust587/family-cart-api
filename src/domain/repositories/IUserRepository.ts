import {User} from '../entities/index';

export interface IUserRepository {
  create(user: User): Promise<User>;
  getAll(): Promise<User[]>;
  getByEmail(email: string): Promise<User | null>;
  getById(id: number): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<User>;
}
