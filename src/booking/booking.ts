import { BookList } from "../book/bookList.js";
import { Book } from "../book/book.js";
import { User } from "../user/user.js";

export class Booking {
  readonly bookingDate: Date;
  private readonly userID: string;
  private bookings: BookList;
  constructor(user: User) {
    this.bookingDate = new Date();
    this.userID = user.id;
    this.bookings = new BookList();
  }
  getUserID(): string {
    return this.userID;
  }
  addBooks(book: Book, quantity: number = 1): void {
    this.bookings.addBook(book, quantity);
  }
  removeBooks(book: Book, quantity: number = 1): void {
    this.bookings.removeBook(book, quantity);
  }
  returnBooks(): BookList {
    return this.bookings;
  }
}
