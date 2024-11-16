export interface IRemoveUserFromCart {
  execute(userId: number, cartId: number): Promise<boolean>;
}
