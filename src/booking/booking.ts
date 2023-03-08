import { List } from "../list/list.js";
import { Book } from "../book/book.js";
import { User } from "../user/user.js";

export class Booking {
  private readonly bookingDate: Date;
  private readonly userID: string;
  private bookings: List;
  constructor(user: User) {
    this.bookingDate = new Date();
    this.userID = user.getID();
    this.bookings = new List();
  }
  getUserID(): string {
    return this.userID;
  }
  getDate(): Date {
    return this.bookingDate;
  }
  addBooks(book: Book, quantity: number = 1): void {
    this.bookings.add(book, quantity);
  }
  removeBooks(book: Book, quantity: number = 1): void {
    this.bookings.delete(book, quantity);
  }
  returnBooks(): List {
    return this.bookings;
  }
}
