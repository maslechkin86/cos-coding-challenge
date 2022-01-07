import { IAuction } from "../../CarOnSaleClient/interface/IAuction";

/**
 * Represent an interface of a class that calculate auction statistic.
 */
export interface IAuctionProcessor {
  getAverageNumberOfBids(auctions: IAuction[]): number;

  getAverageAuctionProgress(auctions: IAuction[]): number;
}
