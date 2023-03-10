import { v4 as newUuid } from "uuid";

export class Book {
  readonly id: string = newUuid();
}
