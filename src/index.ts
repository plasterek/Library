import { Library } from "./library/Library.component.js";
import { BookList } from "./book/BookList.service.js";
import { UserList } from "./user/UserList.service.js";
import { Booking } from "./booking/Booking.service.js";

const bookList: BookList = new BookList();
const userList: UserList = new UserList();
const bookings: Booking = new Booking();
const library: Library = new Library(bookList, userList, bookings);
