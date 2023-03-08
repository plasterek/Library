import { Book } from "./book.js";
import { BookWithQuantity } from "./interfaces/bookWithQuantity.interface.js";
import { removeItemFromArray } from "../helpers/removeItemFromArray.js";

export class BookList {
  private bookList: BookWithQuantity[];
  constructor() {
    this.bookList = [];
  }
  public addBook(book: Book, quantity: number = 1): void {
    const bookExists: BookWithQuantity | undefined = this.bookExists(book);
    if (bookExists) {
      bookExists.quantity += quantity;
      return;
    }
    this.bookList.push({ book: book, quantity: quantity });
  }
  public removeBook(book: Book, quantity: number = 1): void {
    try {
      const bookExists: BookWithQuantity | undefined = this.bookExists(book);
      if (bookExists) {
        if (quantity === bookExists.quantity) {
          removeItemFromArray(this.bookList, bookExists);
          return;
        } else if (quantity > bookExists.quantity) {
          throw new Error("Trying to remove too many books!");
        }
        bookExists.quantity -= quantity;
        return;
      }
      throw new Error("Book does not exist!");
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  private bookExists(book: Book): BookWithQuantity | undefined {
    return this.bookList.find((books) => books.book.id === book.id);
  }
}
