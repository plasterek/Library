import { v4 as newUuid } from "uuid";

export class User {
  readonly id: string = newUuid();
  private bannedTill: Date | false = false;
  private penaltyPoints: number = 0;

  public unBan(): void {
    this.bannedTill = false;
  }
  public checkIfUnableToBorrow(): Date | false {
    return this.bannedTill;
  }
  public setPenalty(points: number): void {
    this.penaltyPoints += points;
    if (this.penaltyPoints >= 10) this.setBan();
  }
  private setBan(): void {
    const date: Date = new Date();
    const banDays: number = 30;
    date.setDate(date.getDate() + banDays);
    this.bannedTill = date;
  }
}
