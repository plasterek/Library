import { User } from "./user.js";
import { removeItemFromArray } from "../helpers/removeItemFromArray.js";

export class UserList {
  private userList: User[] = [];

  public addUser(user: User): void {
    try {
      const userExists: User | undefined = this.userExists(user);
      if (userExists) {
        throw new Error("User alredy exist!");
      }
      this.userList.push(user);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public removeUser(user: User): void {
    try {
      const userExists: User | undefined = this.userExists(user);
      if (!userExists) {
        throw new Error("User you are trying to remove does not exist!");
      }
      removeItemFromArray(this.userList, user);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public getUserList(): User[] {
    return this.userList;
  }
  public getUserByID(userID: string): User {
    const user: User | undefined = this.userList.find(
      (users) => userID === users.id
    );
    if (!user) {
      throw new Error("User does not exist!");
    }
    return user;
  }
  public ifUserAbleToBorrow(user: User): boolean {
    try {
      const userExist = this.userExists(user);
      if (!userExist) {
        throw new Error("User does not exist!");
      }
      const status: Date | false = userExist.checkIfUnableToBorrow();
      if (status) {
        const today = new Date();
        if (today.getTime() < status.getTime()) {
          throw new Error(`User is banned till ${status}`);
        }
        userExist.unBan();
        return true;
      }
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public userExists(user: User): User | undefined {
    return this.userList.find((users) => users === user);
  }
}
