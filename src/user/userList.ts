import { User } from "./user.js";

export class UserList {
  userList: User[];
  constructor() {
    this.userList = [];
  }
  addUser(user: User): void {
    const userExists: User | undefined = this.userList.find(
      (users) => users === user
    );
    if (userExists) {
      throw new Error("User alredy exists!");
    }
    this.userList.push(user);
  }
  removeUser(user: User): void {
    const userExists: User | undefined = this.userList.find(
      (users) => users === user
    );
    if (!userExists) {
      throw new Error("User you are trying to remove does not exist!");
    }
    const userIndex = this.userList.findIndex((users) => users === userExists);
    this.userList.splice(userIndex, 1);
  }
}
