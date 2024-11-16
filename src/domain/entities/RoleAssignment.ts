import {Cart} from './Cart';
import {User} from './User';

export class RoleAssignment {
  constructor(
    public id: number | null,
    public cart: Cart,
    public user: User,
    public role: 'OWNER' | 'MEMBER',
  ) {}
}
