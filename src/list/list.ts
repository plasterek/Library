export class List {
  private list: Map<string, number>;
  constructor() {
    this.list = new Map();
  }
  public add(id: string, quantity: number = 1): void {
    let itemQuantity: number | undefined = this.list.get(id);
    if (itemQuantity) {
      itemQuantity += quantity;
      return;
    }
    this.list.set(id, quantity);
  }
  public delete(id: string, quantity: number = 1): void {
    try {
      let itemQuantity: number | undefined = this.list.get(id);
      if (itemQuantity) {
        if (quantity === itemQuantity) {
          this.list.delete(id);
          return;
        }
        itemQuantity -= quantity;
        return;
      }
      throw new Error("Nothing to delete!");
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public getQuantity(id: string): number {
    const quantity: number | undefined = this.list.get(id);
    if (!quantity) {
      return 0;
    }
    return quantity;
  }
}
