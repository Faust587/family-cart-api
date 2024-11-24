import {IRemoveUserFromCart} from '../interfaces/IRemoveUserFromCart';
import {IRoleAssignmentRepository} from '../../domain/repositories/IRoleAssignmentRepository';

export class RemoveUserFromCart implements IRemoveUserFromCart {
  constructor(private roleAssignmentRepository: IRoleAssignmentRepository) {}

  async execute(userId: number, cartId: number): Promise<boolean> {
    try {
      const existedAssigment = await this.roleAssignmentRepository.getByUserAndCartId(userId, cartId);
      if (!existedAssigment) {
        return true;
      }
      await this.roleAssignmentRepository.delete(existedAssigment.id);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
