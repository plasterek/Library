import { Book } from "../../book/Book.service";
import { BookList } from "../../book/BookList.service";
import { Booking } from "../../booking/Booking.service";
import * as penaltyCounter from "../../penalty/CountPenalty.service";
import { User } from "../../user/User.service";
import { UserList } from "../../user/UserList.service";
import { Library } from "../Library.component";

describe("Library class", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("When adding a book and book do not exist in library", () => {
    it("Book should be added to booklist", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const book: Book = new Book("author", "title");
      //when
      library.addBook(book);
      //then
      expect(() => booklist.findBookByID(book.id)).not.toThrow();
    });
  });
  describe("When adding a book and book already exist in library", () => {
    it("Book quantity in booklist should change", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const book: Book = new Book("author", "title");
      //when
      library.addBook(book);
      const bookQuantity: number = booklist.findBookByID(book.id).quantity;
      library.addBook(book);
      //then
      expect(booklist.findBookByID(book.id).quantity).toBeGreaterThan(
        bookQuantity
      );
    });
  });
  describe("When removing a book and book does not exist in library", () => {
    it("It should throw and exception", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const book: Book = new Book("author", "title");
      //then
      expect(() => library.removeBook(book)).toThrow();
    });
  });
  describe("When removing a book and and there is only 1 book", () => {
    it("Book list should be empty", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const book: Book = new Book("author", "title");
      //when
      library.addBook(book);
      library.removeBook(book);
      //then
      expect(booklist).toMatchInlineSnapshot(`
BookList {
  "bookList": [],
}
`);
    });
  });
  describe("When adding a user and user do not exist in library", () => {
    it("User should appear in user list", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      //when
      library.addUser(user);
      //then
      expect(() => userList.getUserByID(user.id)).not.toThrow();
    });
  });
  describe("When adding a user and user alredy exist in library", () => {
    it("It should throw exception", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      //when
      library.addUser(user);
      //then
      expect(() => library.addUser(user)).toThrow();
    });
  });
  describe("When trying to remove user and user do not exist in library", () => {
    it("It should throw exception", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      //then
      expect(() => library.removeUser(user)).toThrow();
    });
  });
  describe("When trying to remove user and there is only one given user in library", () => {
    it("User list should be empty", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      //when
      library.addUser(user);
      library.removeUser(user);
      //then
      expect(userList).toMatchInlineSnapshot(`
UserList {
  "userList": [],
}
`);
    });
  });
  describe("When trying to borrow books and given user does not exist in library", () => {
    it("It should throw exception", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      const book: Book = new Book("author", "title");
      const books: Map<string, number> = new Map().set(book.id, 1);
      //when
      library.addBook(book);
      //then
      expect(() => library.borrowBooks(user, books)).toThrow();
    });
  });
  describe("When trying to borrow books and given book does not exist in library", () => {
    it("It should throw exception", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      const book: Book = new Book("author", "title");
      const books: Map<string, number> = new Map().set(book.id, 1);
      //when
      library.addUser(user);
      //then
      expect(() => library.borrowBooks(user, books)).toThrow();
    });
  });
  describe("When trying to borrow books and given user is not able to borrow cuz of penalty", () => {
    it("It should throw exception", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      const book: Book = new Book("author", "title");
      const books: Map<string, number> = new Map().set(book.id, 1);
      //when
      jest.spyOn(userList, "ifUserAbleToBorrow").mockImplementation(() => {
        throw new Error();
      });
      library.addUser(user);
      library.addBook(book);
      //then
      expect(() => library.borrowBooks(user, books)).toThrow();
    });
  });
  describe("When trying to borrow books and everything goes well", () => {
    it("getUserByID from userList should be called", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      const book: Book = new Book("author", "title");
      const books: Map<string, number> = new Map().set(book.id, 1);
      const getUser = jest.spyOn(userList, "getUserByID");
      //when
      library.addUser(user);
      library.addBook(book);
      library.borrowBooks(user, books);
      //then
      expect(getUser).toBeCalled();
    });
    it("ifUserAbleToBorrow from userList should be called", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      const book: Book = new Book("author", "title");
      const books: Map<string, number> = new Map().set(book.id, 1);
      const ifAbleToBorrow = jest.spyOn(userList, "ifUserAbleToBorrow");
      //when
      library.addUser(user);
      library.addBook(book);
      library.borrowBooks(user, books);
      //then
      expect(ifAbleToBorrow).toBeCalled();
    });
    it("addBooking from booking should be called", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      const book: Book = new Book("author", "title");
      const books: Map<string, number> = new Map().set(book.id, 1);
      const addBooking = jest.spyOn(bookings, "addBooking");
      //when
      library.addUser(user);
      library.addBook(book);
      library.borrowBooks(user, books);
      //then
      expect(addBooking).toBeCalled();
    });
    it("given book quantity should decrease in booklist", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      const book: Book = new Book("author", "title");
      const books: Map<string, number> = new Map().set(book.id, 1);
      const addBooking = jest.spyOn(bookings, "addBooking");
      //when
      const quantity: number = 5;
      library.addUser(user);
      library.addBook(book, quantity);
      library.borrowBooks(user, books);
      //then
      expect(booklist.findBookByID(book.id).quantity).toBeLessThan(quantity);
    });
  });
  describe("When trying to return books and user do not exist in library", () => {
    it("It should throw an exception", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      //then
      expect(() => library.returnBooks(user)).toThrow();
    });
  });
  describe("When trying to return books and user have not boorowed any books", () => {
    it("It should throw an exception", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      //when
      library.addUser(user);
      //then
      expect(() => library.returnBooks(user)).toThrow();
    });
  });
  describe("When trying to return books and everything goes well", () => {
    it("IgetUserByID method from user list should be called", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      const book: Book = new Book("author", "title");
      const books: Map<string, number> = new Map().set(book.id, 1);
      const getUserID = jest.spyOn(userList, "getUserByID");
      //when
      library.addUser(user);
      library.addBook(book);
      library.borrowBooks(user, books);
      library.returnBooks(user);
      //then
      expect(getUserID).toBeCalled();
    });
    it("getReturnDate method from bookings list should be called", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      const book: Book = new Book("author", "title");
      const books: Map<string, number> = new Map().set(book.id, 1);
      const getDate = jest.spyOn(bookings, "getReturnDate");
      //when
      library.addUser(user);
      library.addBook(book);
      library.borrowBooks(user, books);
      library.returnBooks(user);
      //then
      expect(getDate).toBeCalled();
    });
    it("returnBooks method from bookings list should be called", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      const book: Book = new Book("author", "title");
      const books: Map<string, number> = new Map().set(book.id, 1);
      const returnBooks = jest.spyOn(bookings, "returnBooks");
      //when
      library.addUser(user);
      library.addBook(book);
      library.borrowBooks(user, books);
      library.returnBooks(user);
      //then
      expect(returnBooks).toBeCalled();
    });
    it("getReturnDate method from bookings list should be called", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      const book: Book = new Book("author", "title");
      const books: Map<string, number> = new Map().set(book.id, 1);
      const returnBooks = jest.spyOn(bookings, "returnBooks");
      //when
      library.addUser(user);
      library.addBook(book);
      library.borrowBooks(user, books);
      library.returnBooks(user);
      //then
      expect(returnBooks).toBeCalled();
    });
  });
  describe("When trying to return books and everything goes well but user returned books after return date", () => {
    it("setPenalty from User class should be called", () => {
      //given
      const booklist: BookList = new BookList();
      const userList: UserList = new UserList();
      const bookings: Booking = new Booking();
      const library: Library = new Library(booklist, userList, bookings);
      const user: User = new User("user");
      const book: Book = new Book("author", "title");
      const books: Map<string, number> = new Map().set(book.id, 1);
      const setPenalty = jest.spyOn(user, "setPenalty");
      //when
      jest.spyOn(penaltyCounter, "countPenalty").mockReturnValue(5);
      library.addUser(user);
      library.addBook(book);
      library.borrowBooks(user, books);
      library.returnBooks(user);
      //then
      expect(setPenalty).toBeCalled();
    });
  });
});
