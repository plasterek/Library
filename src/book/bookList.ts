export class BookList {
  private list: Map<string, number>;
  constructor() {
    this.list = new Map();
  }
  public addBooks(id: string, quantity: number = 1): void {
    let itemQuantity: number | undefined = this.list.get(id);
    console.log("quant", itemQuantity);
    if (itemQuantity) {
      itemQuantity += quantity;
      this.list.set(id, itemQuantity);
      return;
    }
    this.list.set(id, quantity);
  }
  public removeBooks(id: string, quantity: number = 1): void {
    try {
      let itemQuantity: number | undefined = this.list.get(id);
      if (itemQuantity) {
        if (quantity === itemQuantity) {
          this.list.delete(id);
          return;
        } else if (quantity > itemQuantity) {
          throw new Error("Trying to delete to many items!");
        }
        itemQuantity -= quantity;
        this.list.set(id, itemQuantity);
        return;
      }
      throw new Error("Nothing to remove!");
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
