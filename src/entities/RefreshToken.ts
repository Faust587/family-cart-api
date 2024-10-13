import {User} from './User';

export class RefreshToken {
  constructor(
    public id: string | null,
    public user: User,
    public token: string,
  ) {}
}
