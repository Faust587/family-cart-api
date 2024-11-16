import { RoleAssignment} from '../entities/index';

export interface IRoleAssignmentRepository {
  getAll(): Promise<RoleAssignment[]>;
  getById(id: number): Promise<RoleAssignment>;
  getByCartId(cartId: number): Promise<RoleAssignment[]>;
  getByUserId(userId: number): Promise<RoleAssignment[]>;
  getByUserAndCartId(userId: number, cartId: number): Promise<RoleAssignment>
  create(roleAssignment: RoleAssignment): Promise<RoleAssignment>;
  update(RoleAssignment: RoleAssignment): Promise<RoleAssignment>;
  delete(id: number): Promise<RoleAssignment>;
}
