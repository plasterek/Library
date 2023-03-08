import { v4 as newUuid } from "uuid";

export class User {
  readonly id: string;
  constructor() {
    this.id = newUuid();
  }
}
