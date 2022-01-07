import { IAuction } from "../../CarOnSaleClient/interface/IAuction";

export interface IAuctionProcessor {
  getAverageNumberOfBids(auctions: IAuction[]): number;

  getAverageAuctionProgress(auctions: IAuction[]): number;
}
