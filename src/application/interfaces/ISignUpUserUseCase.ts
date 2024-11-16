import {User} from '../../domain/entities/index';

export interface ISignUpUserUseCase {
  execute(data: User): Promise<{ user: User, accessToken: string }>;
}
