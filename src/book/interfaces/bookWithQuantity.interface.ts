import { Book } from "../book.js";

export interface BookWithQuantity {
  book: Book;
  quantity: number;
}
