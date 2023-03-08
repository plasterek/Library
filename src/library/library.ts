import { BookList } from "../book/bookList.js";
import { Book } from "../book/book.js";

export class Library {
  availableBooks: BookList;
  constructor(availableBooks: BookList) {
    this.availableBooks = availableBooks;
  }
  addBookToLibrary(book: Book, quantity: number = 1): void {
    this.availableBooks.addBooks(book.id, quantity);
  }
  removeBookFromLibrary(book: Book, quantity: number = 1): void {
    this.availableBooks.removeBooks(book.id, quantity);
  }
}
