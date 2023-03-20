import { User } from "./User.service.js";
import { removeItemFromArray } from "../helpers/removeItemFromArray";

export class UserList {
  private userList: User[] = [];

  public addUser(user: User): void {
    try {
      const userExist: User | undefined = this.userList.find(
        (users) => user.id === users.id
      );
      if (!userExist) {
        this.userList.push(user);
        return;
      }
      throw new Error("User alredy exist!");
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public removeUser(user: User): void {
    const userExists: User = this.getUserByID(user.id);
    removeItemFromArray(this.userList, userExists);
  }
  public getUserList(): User[] {
    return this.userList;
  }
  public getUserByID(userID: string): User {
    try {
      const user: User | undefined = this.userList.find(
        (users) => userID === users.id
      );
      if (!user) {
        throw new Error("User does not exist!");
      }
      return user;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public ifUserAbleToBorrow(user: User): boolean {
    try {
      const userExist: User = this.getUserByID(user.id);
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
}
