import {ISignInUserUseCase} from '../interfaces/ISignInUserUseCase';
import {User} from '../../domain/entities/index';
import {IUserRepository} from '../../domain/repositories/IUserRepository';
import {IHashingService} from '../interfaces/IHashingService';
import {IJwtService} from '../interfaces/IJwtService';

export class SignInUseCase implements ISignInUserUseCase {
  constructor(private userRepository: IUserRepository,
              private hashingService: IHashingService,
              private jwtService: IJwtService) {}

  async execute(email: string, password: string): Promise<{ user: User; accessToken: string }> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new Error("Email or password is incorrect");
    }

    const isPasswordValid = await this.hashingService.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Email or password is incorrect");
    }

    const accessToken = this.jwtService.generateToken({id: user.id})

    return {user, accessToken};
  }
}
