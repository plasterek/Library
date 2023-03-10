import { Book } from "../book/book.js";

export class AvailableBooks {
  private books: Map<string, number> = new Map();

  public addBook(book: Book, quantity: number = 1): void {
    let bookQuantity: number | undefined = this.getBookQuantity(book);
    if (bookQuantity) {
      bookQuantity += quantity;
      this.books.set(book.id, bookQuantity);
      return;
    }
    this.books.set(book.id, quantity);
  }
  public borrowBook(book: Book, quantity: number = 1): void {
    try {
      let bookQuantity: number | undefined = this.getBookQuantity(book);
      if (bookQuantity) {
        if (bookQuantity < quantity) {
          throw new Error("Book is not available!");
        } else if (bookQuantity === quantity) {
          this.books.delete(book.id);
          return;
        }
        bookQuantity -= quantity;
        this.books.set(book.id, bookQuantity);
        return;
      }
      throw new Error("Book is not available!");
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public getBooks() {
    return this.books;
  }
  private getBookQuantity(book: Book): number | undefined {
    return this.books.get(book.id);
  }
}
