import { Book } from "./book/book.js";
import { Library } from "./library/library.js";
import { BookList } from "./book/bookList.js";
import { UserList } from "./user/userList.js";
import { User } from "./user/user.js";
import { Booking } from "./booking/booking.js";
import { BookingList } from "./booking/bookingList.js";
import { AvailableBooks } from "./availableBooks/availableBooks.js";

const bookList: BookList = new BookList();
const userList: UserList = new UserList();
const bookings: BookingList = new BookingList();
const availableBooks: AvailableBooks = new AvailableBooks();
const library: Library = new Library(
  bookList,
  userList,
  bookings,
  availableBooks
);
