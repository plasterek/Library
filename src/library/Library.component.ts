import { BookList } from "../book/BookList.service.js";
import { Book } from "../book/Book.service.js";
import { UserList } from "../user/UserList.service.js";
import { User } from "../user/User.service.js";
import { Booking } from "../booking/Booking.service.js";
import { countPenalty } from "../penalty/CountPenalty.service";

export class Library {
  private readonly bookList: BookList;
  private readonly userList: UserList;
  private readonly bookings: Booking;

  constructor(booklist: BookList, userList: UserList, bookings: Booking) {
    this.bookList = booklist;
    this.userList = userList;
    this.bookings = bookings;
  }
  public addBook(book: Book, quantity: number = 1): void {
    this.bookList.addBook(book, quantity);
  }
  public removeBook(book: Book): void {
    this.bookList.removeBook(book);
  }
  public addUser(user: User): void {
    this.userList.addUser(user);
  }
  public removeUser(user: User): void {
    this.userList.removeUser(user);
  }
  public borrowBooks(user: User, books: Map<string, number>): void {
    const userExist = this.userList.getUserByID(user.id);
    this.userList.ifUserAbleToBorrow(userExist);
    this.bookings.addBooking(user.id, books);
    this.makeBooksUnavailable(books);
  }
  public returnBooks(user: User): void {
    const userExist = this.userList.getUserByID(user.id);
    const returnDate = this.bookings.getReturnDate(user.id);
    const books = this.bookings.returnBooks(user.id);
    this.makeBooksAvailable(books);
    const penalty = countPenalty(returnDate);
    if (penalty > 0) userExist.setPenalty(penalty);
  }
  private makeBooksUnavailable(books: Map<string, number>): void {
    books.forEach((value, key) => {
      const book: Book = this.bookList.findBookByID(key).book;
      this.bookList.borrowBook(book, value);
    });
  }
  private makeBooksAvailable(books: Map<string, number>): void {
    books.forEach((value, key) => {
      const book: Book = this.bookList.findBookByID(key).book;
      this.bookList.addBook(book, value);
    });
  }
}
