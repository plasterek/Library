import { BookList } from "../book/bookList.js";
import { Book } from "../book/book.js";
import { UserList } from "../user/userList.js";
import { User } from "../user/user.js";
import { Booking } from "../booking/booking.js";
import { BookingList } from "../booking/bookingList.js";
import { AvailableBooks } from "../availableBooks/availableBooks.js";

export class Library {
  bookList: BookList;
  userList: UserList;
  bookings: BookingList;
  availableBooks: AvailableBooks;
  constructor(
    booklist: BookList,
    userList: UserList,
    bookings: BookingList,
    availableBooks: AvailableBooks
  ) {
    this.bookList = booklist;
    this.userList = userList;
    this.bookings = bookings;
    this.availableBooks = availableBooks;
  }
  public addBook(book: Book, quantity: number = 1): void {
    this.bookList.addBook(book, quantity);
    this.availableBooks.addBook(book, quantity);
  }
  public removeBook(book: Book, quantity: number = 1): void {
    this.bookList.removeBook(book, quantity);
    this.availableBooks.borrowBook(book, quantity);
  }
  public addUser(user: User): void {
    this.userList.addUser(user);
  }
  public removeUser(user: User): void {
    this.userList.removeUser(user);
  }
  public borrowBooks(booking: Booking): void {
    this.ifUserAbleToBorrow(booking);
    this.bookings.addBooking(booking);
    this.makeBooksUnavailable(booking);
  }
  public returnBooks(booking: Booking): void {
    this.makeBooksAvailable(booking);
    this.penaltyCounter(booking);
    this.bookings.removeBooking(booking);
  }
  private ifUserAbleToBorrow(booking: Booking): boolean {
    const user: User = this.userList.getUserByID(booking.userID);
    return this.userList.ifUserAbleToBorrow(user);
  }
  private makeBooksUnavailable(booking: Booking): void {
    booking.getBooks().forEach((value, key) => {
      const book: Book = this.bookList.findBookByID(key);
      this.availableBooks.borrowBook(book, value);
    });
  }
  private makeBooksAvailable(booking: Booking): void {
    booking.getBooks().forEach((value, key) => {
      const book: Book = this.bookList.findBookByID(key);
      this.availableBooks.addBook(book, value);
    });
  }
  private penaltyCounter(booking: Booking): void {
    const penalty = this.bookings.checkPenalty(booking);
    const user = this.userList.getUserByID(booking.userID);
    user.setPenalty(penalty);
  }
}
