import {IUserRepository} from '../../domain/repositories/IUserRepository';
import {Repository} from 'typeorm';
import {UserSchema} from './models/UserSchema';
import {AppDataSource} from '../database/DatabaseConnection';
import {User} from '../../domain/entities';

export class UserRepositoryImpl implements IUserRepository {
  private ormRepository: Repository<UserSchema>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserSchema);
  }

  async create(user: User): Promise<User> {
    const userEntity = this.ormRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const savedUser = await this.ormRepository.save(userEntity);

    return new User(savedUser.id, savedUser.name, savedUser.email, savedUser.password);
  }

  delete(id: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  getAll(): Promise<User[]> {
    return Promise.resolve([]);
  }

  async getById(id: number): Promise<User> {
    const userEntity = await this.ormRepository.findOneBy({ id });

    if (!userEntity) {
      return null;
    }

    return new User(userEntity.id, userEntity.name, userEntity.email, userEntity.password);
  }

  async getByEmail(email: string): Promise<User | null> {
    const userEntity = await this.ormRepository.findOneBy({ email });

    if (!userEntity) {
      return null;
    }

    return new User(userEntity.id, userEntity.name, userEntity.email, userEntity.password);
  }

  update(user: User): Promise<User> {
    return Promise.resolve(undefined);
  }
}
