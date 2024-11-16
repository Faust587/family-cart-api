import {RoleAssignment} from '../../domain/entities/index';

export interface IAddUserToCartUseCase {
  execute(userId: number, cartId: number): Promise<RoleAssignment>
}
