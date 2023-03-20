import { Book } from "../Book.service";
import { BookList } from "../BookList.service";
import { BookWithQuantity } from "../models/BookWithQuantity.model";

describe("BookList class", () => {
  const book: Book = new Book("author", "title");
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("When adding a book to BookList", () => {
    it("Book quantity should change", () => {
      //given
      const bookList: BookList = new BookList();
      //when
      bookList.addBook(book);
      bookList.addBook(book);
      //then
      const bookOnAList: BookWithQuantity = bookList.findBookByID(book.id);
      expect(bookOnAList.quantity).toBeGreaterThan(1);
    });
  });
  describe("When borrowing a book and everything went well", () => {
    it("findBookByID method should be called", () => {
      //given
      const bookList: BookList = new BookList();
      const findBookByID = jest
        .spyOn(bookList, "findBookByID")
        .mockImplementation();
      //when
      bookList.addBook(book);
      bookList.borrowBook(book);
      //then
      expect(findBookByID).toBeCalled();
    });
    it("Given book quantity should change", () => {
      //given
      const bookList: BookList = new BookList();
      const numberOfBooks: number = 5;
      bookList.addBook(book, numberOfBooks);
      //when
      bookList.borrowBook(book);
      //then
      const bookOnAList: BookWithQuantity = bookList.findBookByID(book.id);
      expect(bookOnAList.quantity).toBeLessThan(numberOfBooks);
    });
  });
  describe("When borrowing a book and it does not exist", () => {
    it("It should throw and exception", () => {
      //given
      const bookList: BookList = new BookList();
      //then
      expect(() => bookList.borrowBook(book)).toThrow();
    });
  });
  describe("When trying to borrow more books than are listed", () => {
    it("It should throw an exception", () => {
      //given
      const bookList: BookList = new BookList();
      bookList.addBook(book, 1);
      //then
      expect(() => bookList.borrowBook(book, 5)).toThrow();
    });
  });
  describe("When removing a book and everything went well", () => {
    it("findBookByID method should be called", () => {
      //given
      const bookList: BookList = new BookList();
      const findBookByID = jest
        .spyOn(bookList, "findBookByID")
        .mockImplementation();
      //when
      bookList.addBook(book);
      bookList.removeBook(book);
      //then
      expect(findBookByID).toBeCalled();
    });
    it("Given book should no longer exist on list", () => {
      //given
      const bookList: BookList = new BookList();
      //when
      bookList.addBook(book);
      bookList.removeBook(book);
      //then
      expect(() => bookList.findBookByID(book.id)).toThrow();
    });
  });
  describe("When removing a book and it does not exist on list", () => {
    it("It should throw and exception", () => {
      //given
      const bookList: BookList = new BookList();
      //then
      expect(() => bookList.removeBook(book)).toThrow();
    });
  });
  describe("When trying to find book by ID and it does not exist on list", () => {
    it("It shoud throw an exception", () => {
      //given
      const bookList: BookList = new BookList();
      //then
      expect(() => bookList.findBookByID(book.id)).toThrow();
    });
  });
  describe("When trying to find book by ID and it does exist on list", () => {
    it("It shoud return BookWithQuantity object", () => {
      //given
      const bookList: BookList = new BookList();
      //when
      bookList.addBook(book);
      //then
      const objectMatch: BookWithQuantity = { book: book, quantity: 1 };
      expect(bookList.findBookByID(book.id)).toMatchObject(objectMatch);
    });
  });
});
