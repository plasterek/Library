import { v4 as newUuid } from "uuid";

export class User {
  private readonly id: string;
  constructor() {
    this.id = newUuid();
  }
  getID(): string {
    return this.id;
  }
}
