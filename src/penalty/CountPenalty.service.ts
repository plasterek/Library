export const countPenalty = (returnDate: Date): number => {
  const today: Date = new Date();
  const delay: number = today.getTime() - returnDate.getTime();
  const delayDays: number = Math.round(delay / (1000 * 60 * 60 * 24));
  if (delayDays <= 0) {
    return 0;
  }
  return delayDays;
};
