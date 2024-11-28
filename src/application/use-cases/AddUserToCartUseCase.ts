import {IAddUserToCartUseCase} from '../interfaces/IAddUserToCartUseCase';
import {RoleAssignment} from '../../domain/entities/index';
import {ICartRepository} from '../../domain/repositories/ICartRepository';
import {IUserRepository} from '../../domain/repositories/IUserRepository';
import {IRoleAssignmentRepository} from '../../domain/repositories/IRoleAssignmentRepository';

export class AddUserToCartUseCase implements IAddUserToCartUseCase {
  constructor(private userRepository: IUserRepository,
              private cartRepository: ICartRepository,
              private roleAssignmentRepository: IRoleAssignmentRepository) {}

  async execute(email: string, cartId: number): Promise<RoleAssignment> {
    const cart = await this.cartRepository.getById(cartId);
    const user = await this.userRepository.getByEmail(email);

    if (!user) throw new Error("User not found");

    const isAssignmentExists = await this.roleAssignmentRepository.getByUserAndCartId(user.id , cartId);
    if (!!isAssignmentExists) {
      return isAssignmentExists;
    }

    const roleAssignment = new RoleAssignment(null, cart, user, "MEMBER");
    const roleAssignmentEntity = await this.roleAssignmentRepository.create(roleAssignment);

    return new RoleAssignment(roleAssignmentEntity.id, roleAssignmentEntity.cart, roleAssignmentEntity.user, roleAssignmentEntity.role);
  }
}
