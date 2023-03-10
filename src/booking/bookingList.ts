import { Booking } from "./booking.js";
import { BookingWithDate } from "./interfaces/bookingWithDate.interface.js";
import { removeItemFromArray } from "../helpers/removeItemFromArray.js";

export class BookingList {
  private bookingList: BookingWithDate[] = [];

  public addBooking(booking: Booking): void {
    try {
      const bookingExists: BookingWithDate | undefined =
        this.bookingExists(booking);
      if (!bookingExists) {
        const date = new Date();
        const borrowForDays = 30;
        date.setDate(date.getDate() + borrowForDays);
        this.bookingList.push({ booking: booking, returnDate: date });
        return;
      }
      throw new Error("Booking already added!");
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public removeBooking(booking: Booking): void {
    try {
      const bookingExists: BookingWithDate | undefined =
        this.bookingExists(booking);
      if (!bookingExists) {
        throw new Error("Booking you are trying to remove does not exist!");
      }
      removeItemFromArray(this.bookingList, bookingExists);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public checkPenalty(booking: Booking): number {
    const bookingExists: BookingWithDate | undefined =
      this.bookingExists(booking);
    if (!bookingExists) {
      throw new Error("Booking does not exist!");
    }
    const returnDate = bookingExists.returnDate;
    const today = new Date();
    const transformToDays = 1000 * 3600 * 24;
    const daysDifference =
      (today.getTime() - returnDate.getTime()) / transformToDays;
    if (daysDifference <= 0) {
      return 0;
    }
    return daysDifference;
  }
  private bookingExists(booking: Booking): BookingWithDate | undefined {
    return this.bookingList.find((bookings) => bookings.booking === booking);
  }
}
