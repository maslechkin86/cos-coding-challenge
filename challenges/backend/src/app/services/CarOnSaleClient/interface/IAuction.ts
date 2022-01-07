/**
 * This is an interface for an auction model.
 */
export interface IAuction {
  id: number;
  label: string;
  endingTime: Date | null;
  state: number;
  minimumRequiredAsk: number;
  currentHighestBidValue: number;
  numBids: number;
}
