import {ICreateCartUseCase} from '../interfaces/ICreateCartUseCase';
import {Cart, RoleAssignment} from '../../domain/entities/index';
import {IUserRepository} from '../../domain/repositories/IUserRepository';
import {ICartRepository} from '../../domain/repositories/ICartRepository';
import {IRoleAssignmentRepository} from '../../domain/repositories/IRoleAssignmentRepository';
import {IDatabaseTransaction} from '../interfaces/IDatabaseTransaction';

export class CreateCartUseCase implements ICreateCartUseCase {
  constructor(private userRepository: IUserRepository,
              private cartRepository: ICartRepository,
              private roleAssignmentRepository: IRoleAssignmentRepository,
              private databaseTransaction: IDatabaseTransaction) {}

  async execute(cartName: string, ownerId: number): Promise<{ cart: Cart, roleAssignment: RoleAssignment }> {
    try {
      const cartEntity = new Cart(null, cartName);
      const createdCart = await this.cartRepository.create(cartEntity)

      const owner = await this.userRepository.getById(ownerId);

      const roleAssignmentEntity = new RoleAssignment(null, createdCart, owner, "OWNER");

      const roleAssignment = await this.roleAssignmentRepository.create(roleAssignmentEntity);

      return { cart: createdCart, roleAssignment };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}

