import { BookingObject } from "./models/BookingObject.model.js";
import { removeItemFromArray } from "../helpers/removeItemFromArray";

export class Booking {
  private readonly bookings: BookingObject[] = [];

  public addBooking(
    userID: string,
    booksWithQuantity: Map<string, number>
  ): void {
    this.bookings.push({
      returnDate: this.countReturnDate(),
      userID: userID,
      borrowedBooks: booksWithQuantity,
    });
  }
  public getReturnDate(userID: string): Date {
    const booking: BookingObject = this.getBookingByUserID(userID);
    return booking.returnDate;
  }
  public returnBooks(userID: string): Map<string, number> {
    try {
      const booking: BookingObject = this.getBookingByUserID(userID);
      const books = booking.borrowedBooks;
      removeItemFromArray(this.bookings, booking);
      return books;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  private getBookingByUserID(userID: string): BookingObject {
    try {
      const booking: BookingObject | undefined = this.bookings.find(
        (booking) => booking.userID === userID
      );
      if (!booking) {
        throw new Error("User has no bookings!");
      }
      return booking;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  private countReturnDate(): Date {
    const date = new Date();
    const borrowForDays = 30;
    date.setDate(date.getDate() + borrowForDays);
    return date;
  }
}
