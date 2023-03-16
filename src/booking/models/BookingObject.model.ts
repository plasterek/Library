export interface BookingObject {
  readonly returnDate: Date;
  readonly userID: string;
  readonly borrowedBooks: Map<string, number>;
}
