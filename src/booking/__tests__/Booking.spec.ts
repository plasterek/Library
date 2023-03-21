import { Booking } from "../Booking.service";

describe("Booking class", () => {
  const userID = "userID";
  const books: Map<string, number> = new Map().set("string", 10);
  let bookings = new Booking();
  beforeEach(() => {
    bookings = new Booking();
  });
  describe("When adding a booking and everything went well", () => {
    it("It should not throw an exception", () => {
      //then
      expect(() => bookings.addBooking(userID, books)).not.toThrow();
    });
  });
  describe("When tryig to get return date and booking does not exist", () => {
    it("It should throw an exception", () => {
      //then
      expect(() => bookings.getReturnDate(userID)).toThrow();
    });
  });
  describe("When trying to get return date and everything went well", () => {
    it("It should return Date", () => {
      //when
      bookings.addBooking(userID, books);
      const date = bookings.getReturnDate(userID);
      //then
      expect(date.getTime()).not.toBeNaN();
    });
  });
  describe("When trying to return books and booking does not exist", () => {
    it("It should throw an exception", () => {
      //then
      expect(() => bookings.returnBooks(userID)).toThrow();
    });
  });
  describe("When trying to return books and everything went well", () => {
    it("It should return books with quantity map", () => {
      //when
      bookings.addBooking(userID, books);
      //then
      expect(bookings.returnBooks(userID)).toMatchObject(books);
    });
  });
});
