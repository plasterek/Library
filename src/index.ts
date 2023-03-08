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
const user2 = new User();

library.addUser(user1);
library.addUser(user1);
console.log(library.userList.getUserList());
