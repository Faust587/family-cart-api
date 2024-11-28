import {IRemoveItem} from '../interfaces/IRemoveItem';
import {IUserRepository} from '../../domain/repositories/IUserRepository';
import {IRoleAssignmentRepository} from '../../domain/repositories/IRoleAssignmentRepository';
import {IDatabaseTransaction} from '../interfaces/IDatabaseTransaction';
import {ICartItemRepository} from '../../domain/repositories/ICartItemRepository';

export class RemoveItem implements IRemoveItem {
  constructor(private userRepository: IUserRepository,
              private cartItemRepository: ICartItemRepository,
              private roleAssignmentRepository: IRoleAssignmentRepository,
              private databaseTransaction: IDatabaseTransaction) {}

  async execute(itemId: number, userId: number): Promise<void> {
    const item = await this.cartItemRepository.getById(itemId);

    if (!item) {
      throw new Error(`Cart item not found`);
    }

    console.log('item', item)

    const assignments = await this.roleAssignmentRepository.getByCartId(item.cart.id);
    const userAssignments = assignments.find(assignmentItem => assignmentItem.user.id === userId);

    if (!userAssignments || userAssignments.role !== "OWNER") {
      throw new Error(`Forbidden does not exist`);
    }

    await this.cartItemRepository.delete(itemId);
  }
}
