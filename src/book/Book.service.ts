import { v4 as newUuid } from "uuid";

export class Book {
  readonly id: string = newUuid();
  readonly author: string;
  readonly title: string;
  constructor(author: string, title: string) {
    this.author = author;
    this.title = title;
  }
}
