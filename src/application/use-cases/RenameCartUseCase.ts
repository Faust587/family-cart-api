import {IRenameCartUseCase} from '../interfaces/IRenameCartUseCase';
import {Cart} from '../../domain/entities/index';
import {IUserRepository} from '../../domain/repositories/IUserRepository';
import {ICartRepository} from '../../domain/repositories/ICartRepository';
import {IRoleAssignmentRepository} from '../../domain/repositories/IRoleAssignmentRepository';

export class RenameCartUseCase implements IRenameCartUseCase {
  constructor(private userRepository: IUserRepository,
              private cartRepository: ICartRepository,
              private roleAssignmentRepository: IRoleAssignmentRepository
  ) {}

  async execute(id: number, cartName: string, userId: number): Promise<Cart> {
    const assignment = await this.roleAssignmentRepository.getByUserAndCartId(userId, id);

    if (!assignment) {
      throw new Error("Cart not found");
    }

    const {cart} = assignment;
    const cartEntity = new Cart(cart.id, cartName);
    const updatedEntity = await this.cartRepository.update(cartEntity);
    console.log('updatedEntity', updatedEntity)
    return new Cart(updatedEntity.id, updatedEntity.name);
  }
}
