import { Booking } from "../booking.js";

export interface BookingWithDate {
  booking: Booking;
  returnDate: Date;
}
