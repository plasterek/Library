import { Book } from "./book/book.js";
import { Library } from "./library/library.js";
import { BookList } from "./book/bookList.js";
import { UserList } from "./user/userList.js";
import { User } from "./user/user.js";

const bookList = new BookList();
const userList = new UserList();
const library = new Library(bookList, userList);
const book1 = new Book();
const book2 = new Book();
const user1 = new User();

library.addBook(book1);
library.addBook(book2, 2);
console.log("po dodaniu:", library.availableBooks);
library.removeBook(book2);
console.log("po usunięciu:", library.availableBooks);
