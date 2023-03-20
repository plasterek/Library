import { Book } from "./Book.service.js";
import { BookWithQuantity } from "./models/BookWithQuantity.model.js";
import { removeItemFromArray } from "../helpers/removeItemFromArray";

export class BookList {
  private readonly bookList: BookWithQuantity[] = [];

  public addBook(book: Book, quantity: number = 1): void {
    const bookExist: BookWithQuantity | undefined = this.bookList.find(
      (books) => books.book.id === book.id
    );
    if (bookExist) {
      bookExist.quantity += quantity;
      return;
    }
    this.bookList.push({ book: book, quantity: quantity });
  }
  public borrowBook(book: Book, quantity: number = 1): void {
    try {
      const bookExists: BookWithQuantity = this.findBookByID(book.id);
      if (bookExists) {
        if (quantity <= bookExists.quantity) {
          bookExists.quantity -= quantity;
          return;
        }
        throw new Error("Trying to borrow too many books!");
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public removeBook(book: Book): void {
    const bookExists: BookWithQuantity = this.findBookByID(book.id);
    removeItemFromArray(this.bookList, bookExists);
  }
  public findBookByID(bookID: string): BookWithQuantity {
    try {
      const bookExist: BookWithQuantity | undefined = this.bookList.find(
        (books) => books.book.id === bookID
      );
      if (!bookExist) {
        throw new Error("Book does not exist!");
      }
      return bookExist;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
