import { Book } from "./book/book.js";
import { Library } from "./library/library.js";
import { BookList } from "./book/bookList.js";

const bookList = new BookList();
const library = new Library(bookList);
const book1 = new Book();
