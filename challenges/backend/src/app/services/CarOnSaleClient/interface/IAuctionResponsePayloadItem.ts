/**
 * Represent an auction data in get auction response payload.
 */
export interface IAuctionResponsePayloadItem {
  id: number;
  label: string;
  endingTime: Date | null;
  state: number;
  minimumRequiredAsk: number;
  currentHighestBidValue: number;
  numBids: number;
}
