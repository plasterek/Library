import { User } from "./user.js";
import { removeItemFromArray } from "../helpers/removeItemFromArray.js";

export class UserList {
  private userList: User[];
  constructor() {
    this.userList = [];
  }
  public addUser(user: User): void {
    const userExists: User | undefined = this.userExists(user);
    if (userExists) {
      throw new Error("User alredy exists!");
    }
    this.userList.push(user);
  }
  public removeUser(user: User): void {
    const userExists: User | undefined = this.userExists(user);
    if (!userExists) {
      throw new Error("User you are trying to remove does not exist!");
    }
    removeItemFromArray(this.userList, user);
  }
  public getUserList(): User[] {
    return this.userList;
  }
  private userExists(user: User): User | undefined {
    return this.userList.find((users) => users === user);
  }
}
