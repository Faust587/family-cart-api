export interface IRemoveItem {
  execute(itemId: number, userId: number): Promise<void>;
}
