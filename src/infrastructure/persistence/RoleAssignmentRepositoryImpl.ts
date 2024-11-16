import {IRoleAssignmentRepository} from '../../domain/repositories/IRoleAssignmentRepository';
import {RoleAssignment} from '../../domain/entities/index';
import {Repository} from 'typeorm';
import {AppDataSource} from '../database/DatabaseConnection';
import {RoleAssignmentSchema} from './models/RoleAssignmentSchema';

export class RoleAssignmentRepositoryImpl implements IRoleAssignmentRepository {
  private ormRepository: Repository<RoleAssignmentSchema>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(RoleAssignmentSchema);
  }

  async create(roleAssignment: RoleAssignment): Promise<RoleAssignment> {
    const roleAssignmentEntity = this.ormRepository.create({cart: roleAssignment.cart, role: roleAssignment.role, user: roleAssignment.user});

    const savedEntity = await this.ormRepository.save(roleAssignmentEntity);
    return new RoleAssignment(savedEntity.id, savedEntity.cart, savedEntity.user, savedEntity.role);
  }

  async getByCartId(cartId: number): Promise<RoleAssignment[]> {
    const roleAssignmentEntities = await this.ormRepository.find({where: {
        cart: {
          id: cartId,
        },
      }, relations: ['user', 'cart']});

    return roleAssignmentEntities.map(entity => new RoleAssignment(entity.id, entity.cart, entity.user, entity.role))
  }

  async delete(id: number): Promise<RoleAssignment> {
    const roleAssignment = await this.ormRepository.findOne({
      where: { id },
      relations: ['cart', 'user'],
    });

    if (!roleAssignment) {
      return null;
    }

    await this.ormRepository.delete(id);

    return new RoleAssignment(roleAssignment.id, roleAssignment.cart, roleAssignment.user, roleAssignment.role);
  }

  getAll(): Promise<RoleAssignment[]> {
    return Promise.resolve([]);
  }

  getById(id: number): Promise<RoleAssignment> {
    return Promise.resolve(undefined);
  }

  update(RoleAssignment: RoleAssignment): Promise<RoleAssignment> {
    return Promise.resolve(undefined);
  }

  async getByUserId(userId: number): Promise<RoleAssignment[]> {
    const roleAssignmentEntities = await this.ormRepository.find({where: {
        user: {
          id: userId,
        },
      }, relations: ['cart', 'user']});

    return roleAssignmentEntities.map(entity => new RoleAssignment(entity.id, entity.cart, entity.user, entity.role))
  }

  async getByUserAndCartId(userId: number, cartId: number): Promise<RoleAssignment> {
    const roleAssignment = await this.ormRepository.findOne({
      where: { user: {id: userId}, cart: {id: cartId} },
      relations: ['cart', 'user'],
    });

    if (!roleAssignment) {
      return null;
    }

    return new RoleAssignment(roleAssignment.id, roleAssignment.cart, roleAssignment.user, roleAssignment.role);
  }
}
