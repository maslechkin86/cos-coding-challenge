import { injectable } from "inversify";
import { IAuction } from "../../CarOnSaleClient/interface/IAuction";
import { IAuctionProcessor } from "../interface/IAuctionProcessor";

/**
 * Represent a class that calculate auction statistic:
 * - the average number of bids on an auction
 * - the average percentage of the auction progress.
 */
@injectable()
export class AuctionProcessor implements IAuctionProcessor {
  public getAverageNumberOfBids(auctions: IAuction[]): number {
    return auctions.length !== 0
      ? auctions.reduce((total, next) => total + next.numBids, 0) /
          auctions.length
      : 0;
  }

  public getAverageAuctionProgress(auctions: IAuction[]): number {
    let result: number = 0;
    auctions.forEach((auction) => {
      result += AuctionProcessor.calculatePercentage(
        auction.currentHighestBidValue,
        auction.minimumRequiredAsk
      );
    });

    return result / auctions.length;
  }

  private static calculatePercentage(value: number, divisor: number): number {
    return value < divisor && divisor !== 0 ? (value / divisor) * 100 : 100;
  }
}
