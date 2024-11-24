import {User} from '../../domain/entities/index';
import {IUserRepository} from '../../domain/repositories/IUserRepository';
import {IHashingService} from '../interfaces/IHashingService';
import {IJwtService} from '../interfaces/IJwtService';
import {ISignUpUserUseCase} from '../interfaces/ISignUpUserUseCase';

export class SignUpUserUseCase implements ISignUpUserUseCase {
  constructor(private userRepository: IUserRepository,
              private hashingService: IHashingService,
              private jwtService: IJwtService) {}

  async execute(data: User): Promise<{user: User, accessToken: string}> {
    const isEmailExists = await this.userRepository.getByEmail(data.email);

    if (!!isEmailExists) {
      throw new Error("Email already exists");
    }

    data.password =  await this.hashingService.hash(data.password);

    const user = await this.userRepository.create(data);

    const accessToken = this.jwtService.generateToken({id: data.id})

    return {user, accessToken}
  }
}
