import { Book } from "../Book.service.js";

export interface BookWithQuantity {
  book: Book;
  quantity: number;
}
