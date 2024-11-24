import {RoleAssignment} from '../../domain/entities/index';

export interface IAddUserToCartUseCase {
  execute(email: string, cartId: number): Promise<RoleAssignment>
}
