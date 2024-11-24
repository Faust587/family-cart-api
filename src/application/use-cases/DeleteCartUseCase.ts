import {IDeleteCart} from '../interfaces/IDeleteCart';
import {Cart} from '../../domain/entities/index';
import {IUserRepository} from '../../domain/repositories/IUserRepository';
import {ICartRepository} from '../../domain/repositories/ICartRepository';
import {IRoleAssignmentRepository} from '../../domain/repositories/IRoleAssignmentRepository';
import {IDatabaseTransaction} from '../interfaces/IDatabaseTransaction';

export class DeleteCartUseCase implements IDeleteCart {
  constructor(private userRepository: IUserRepository,
              private cartRepository: ICartRepository,
              private roleAssignmentRepository: IRoleAssignmentRepository,
              private databaseTransaction: IDatabaseTransaction) {}

  async execute(userId: number, cartId: number): Promise<Cart> {
    try {
      const roleAssignments = await this.roleAssignmentRepository.getByCartId(cartId);
      const ownerAssignment = roleAssignments.find(item => item.role === "OWNER");

      if (userId !== ownerAssignment?.user.id) {
        throw new Error("Forbidden resource")
      }

      await Promise.all(roleAssignments.map(item => this.roleAssignmentRepository.delete(item.id)));

      return this.cartRepository.delete(cartId)
    } catch (error) {
      throw error;
    }
  }
}
