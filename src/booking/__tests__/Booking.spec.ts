import { Booking } from "../Booking.service";

describe("Booking class", () => {
  describe("When adding a booking and everything went well", () => {
    it("It should not throw an exception", () => {
      //given
      const bookings = new Booking();
      const userID = "userID";
      const books: Map<string, number> = new Map().set("string", 10);
      //then
      expect(() => bookings.addBooking(userID, books)).not.toThrow();
    });
  });
  describe("When tryig to get return date and booking does not exist", () => {
    it("It should throw an exception", () => {
      //given
      const bookings = new Booking();
      const userID = "userID";
      //then
      expect(() => bookings.getReturnDate(userID)).toThrow();
    });
  });
  describe("When trying to get return date and everything went well", () => {
    it("It should return Date", () => {
      //given
      const bookings = new Booking();
      const books: Map<string, number> = new Map().set("string", 10);
      const userID = "userID";
      //when
      bookings.addBooking(userID, books);
      const date = bookings.getReturnDate(userID);
      //then
      expect(date.getTime()).not.toBeNaN();
    });
  });
  describe("When trying to return books and booking does not exist", () => {
    it("It should throw an exception", () => {
      //given
      const bookings = new Booking();
      const userId = "userId";
      //then
      expect(() => bookings.returnBooks(userId)).toThrow();
    });
  });
  describe("When trying to return books and everything went well", () => {
    it("It should return books with quantity map", () => {
      const bookings = new Booking();
      const books: Map<string, number> = new Map().set("string", 10);
      const userID = "userID";
      //when
      bookings.addBooking(userID, books);
      //then
      expect(bookings.returnBooks(userID)).toMatchObject(books);
    });
  });
});
