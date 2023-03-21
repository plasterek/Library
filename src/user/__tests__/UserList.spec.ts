import { User } from "../User.service";
import { UserList } from "../UserList.service";

describe("UserList class", () => {
  //given
  let userList: UserList = new UserList();
  let user: User = new User("user");
  beforeEach(() => {
    jest.clearAllMocks();
    userList = new UserList();
    user = new User("user");
  });
  describe("When adding new user and user already exist", () => {
    it("It should throw an exception", () => {
      //when
      userList.addUser(user);
      //then
      expect(() => userList.addUser(user)).toThrow();
    });
  });
  describe("When adding new user and everything went well", () => {
    it("User should appear in user list", () => {
      //when
      userList.addUser(user);
      //then
      expect(userList.getUserByID(user.id)).toBe(user);
    });
  });
  describe("When trying to remove user and everything went well", () => {
    it("getUserByID method should be called", () => {
      //given
      const getID = jest.spyOn(userList, "getUserByID").mockImplementation();
      //when
      userList.addUser(user);
      userList.removeUser(user);
      //then
      expect(getID).toBeCalled();
    });
    it("It should not throw an exception", () => {
      //when
      userList.addUser(user);
      //then
      expect(() => userList.removeUser(user)).not.toThrow();
    });
  });
  describe("When trying to remove user and user does not exist", () => {
    it("It should throw an exception", () => {
      //then
      expect(() => userList.removeUser(user)).toThrow();
    });
  });
  describe("When trying to get user list and there are no users added", () => {
    it("An empty array should be returned", () => {
      //then
      expect(userList.getUserList()).toMatchSnapshot();
    });
  });
  describe("When trying to get user by ID and user does not exist on a list", () => {
    it("It should throw an exception", () => {
      //then
      expect(() => userList.getUserByID(user.id)).toThrow();
    });
  });
  describe("When trying to get user by ID and user exist on a list", () => {
    it("It should return this user", () => {
      //when
      userList.addUser(user);
      //then
      expect(userList.getUserByID(user.id)).toBe(user);
    });
  });
  describe("When checking if user is able to borrow books and user does not exist on list", () => {
    it("It should throw an exception", () => {
      //then
      expect(() => userList.ifUserAbleToBorrow(user)).toThrow();
    });
  });
  describe("When checking if user is able to borrow books and user exist", () => {
    it("getUserByID method should be called", () => {
      //given
      const getID = jest
        .spyOn(userList, "getUserByID")
        .mockImplementation(() => user);
      //when
      userList.addUser(user);
      userList.ifUserAbleToBorrow(user);
      //then
      expect(getID).toBeCalled();
    });
  });
  describe("When checking if user is able to borrow books and user exist and is able to borrow", () => {
    it("It should return true", () => {
      //when
      userList.addUser(user);
      //then
      expect(userList.ifUserAbleToBorrow(user)).toBe(true);
    });
  });
  describe("When checking if user is able to borrow books and user exist and is not able to borrow", () => {
    it("It should throw an exception", () => {
      //when
      user.setPenalty(20);
      userList.addUser(user);
      //then
      expect(() => userList.ifUserAbleToBorrow(user)).toThrow();
    });
  });
});
