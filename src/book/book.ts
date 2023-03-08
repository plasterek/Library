import { v4 as newUuid } from "uuid";

export class Book {
  readonly id: string;
  constructor() {
    this.id = newUuid();
  }
  getID() {
    return this.id;
  }
}
