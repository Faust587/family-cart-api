import {Cart} from '../../domain/entities/index';

export interface IRenameCartUseCase {
  execute(id: number, cartName: string, userId: number): Promise<Cart>;
}
