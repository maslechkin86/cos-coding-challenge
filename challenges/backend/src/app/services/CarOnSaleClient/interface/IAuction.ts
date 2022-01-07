/**
 * This is an interface for an auction model.
 */
export interface IAuction {
  id: number;
  numBids: number;
  minimumRequiredAsk: number;
  currentHighestBidValue: number;
}
