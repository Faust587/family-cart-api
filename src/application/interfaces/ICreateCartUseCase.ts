import {Cart, RoleAssignment} from '../../domain/entities/index';

export interface ICreateCartUseCase {
  execute(cartName: string, ownerId: number): Promise<{ cart: Cart, roleAssignment: RoleAssignment }>;
}
