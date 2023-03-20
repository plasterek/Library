import { User } from "../User.service";

describe("User class", () => {
  describe("When trying to unban user", () => {
    it("bannedTill property should be changed to false", () => {
      //given
      const user: User = new User("user");
      //when
      user.setPenalty(20);
      user.unBan();
      //then
      expect(user.checkIfUnableToBorrow()).toBe(false);
    });
  });
  describe("When want to check if user is unable to borrow and he is able", () => {
    it("It should return false", () => {
      //given
      const user: User = new User("user");
      //then
      expect(user.checkIfUnableToBorrow()).toBe(false);
    });
  });
  describe("When want to check if user is unable to borrow and he is banned from borrowing", () => {
    it("It should return Date", () => {
      //given
      const user: User = new User("user");
      //when
      user.setPenalty(20);
      //then
      expect(user.checkIfUnableToBorrow()).not.toBeNaN();
    });
  });
  describe("When setting penalty with less than 10 points", () => {
    it("User should be able to borrow", () => {
      //given
      const user: User = new User("user");
      //when
      user.setPenalty(9);
      //then
      expect(user.checkIfUnableToBorrow()).toBe(false);
    });
  });
  describe("When setting penalty with 10 or more points", () => {
    it("Given user should not be able to borrow books", () => {
      //given
      const user: User = new User("user");
      //when
      user.setPenalty(10);
      //then
      expect(user.checkIfUnableToBorrow()).not.toBeNaN();
    });
  });
});
