import {User} from '../../domain/entities/index';

export interface ISignInUserUseCase {
  execute(email: string, password: string): Promise<{ user: User, accessToken: string }>
}
