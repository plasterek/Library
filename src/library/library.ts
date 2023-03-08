import { BookList } from "../book/bookList.js";
import { Book } from "../book/book.js";
import { UserList } from "../user/userList.js";
import { User } from "../user/user.js";

export class Library {
  availableBooks: BookList;
  userList: UserList;
  constructor(availableBooks: BookList, userList: UserList) {
    this.availableBooks = availableBooks;
    this.userList = userList;
  }
  addBook(book: Book, quantity: number = 1): void {
    this.availableBooks.addBook(book, quantity);
  }
  removeBook(book: Book, quantity: number = 1): void {
    this.availableBooks.removeBook(book, quantity);
  }
  addUser(user: User): void {
    this.userList.addUser(user);
  }
  removeUser(user: User): void {
    this.userList.removeUser(user);
  }
}
