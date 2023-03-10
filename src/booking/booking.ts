import { Book } from "../book/book.js";
import { User } from "../user/user.js";

export class Booking {
  readonly userID: string;
  private books: Map<string, number> = new Map();
  constructor(user: User) {
    this.userID = user.id;
  }

  public addBook(book: Book, quantity: number = 1): void {
    let bookQuantity: number | undefined = this.getBookQuantity(book);
    if (bookQuantity) {
      bookQuantity += quantity;
      this.books.set(book.id, bookQuantity);
      return;
    }
    this.books.set(book.id, quantity);
  }
  public removeBook(book: Book, quantity: number = 1): void {
    try {
      let bookQuantity: number | undefined = this.getBookQuantity(book);
      if (bookQuantity) {
        if (bookQuantity < quantity) {
          throw new Error("Trying to remove too many books from booking!");
        } else if (bookQuantity === quantity) {
          this.books.delete(book.id);
          return;
        }
        bookQuantity -= quantity;
        this.books.set(book.id, bookQuantity);
        return;
      }
      throw new Error("Book does not exists in this booking!");
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public getBooks(): Map<string, number> {
    return this.books;
  }
  private getBookQuantity(book: Book): number | undefined {
    return this.books.get(book.id);
  }
}
