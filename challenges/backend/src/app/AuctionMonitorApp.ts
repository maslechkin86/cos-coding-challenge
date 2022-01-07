import { inject, injectable } from "inversify";
import "reflect-metadata";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IAuction } from "./services/CarOnSaleClient/interface/IAuction";

@injectable()
export class AuctionMonitorApp {
  public constructor(
    @inject(DependencyIdentifier.LOGGER)
    private logger: ILogger,
    @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT)
    private client: ICarOnSaleClient
  ) {}

  public async start(): Promise<void> {
    const feature: string = "Auction Monitor";
    this.logger.log(`${feature} : starts`);
    const auctions: IAuction[] = await this.client.getRunningAuctions();
    this.logger.log(`${feature} : number of auctions: ${auctions.length}`);
    const averageNumberOfBids: number = this.getAverageNumberOfBids(auctions);
    this.logger.log(
      `${feature} : average number of bids: ${averageNumberOfBids}`
    );
    const averageAuctionProgress: number =
      this.getAverageAuctionProgress(auctions);
    this.logger.log(
      `${feature} : average auction progress: ${averageAuctionProgress}`
    );
    this.logger.log(`${feature} : ends`);
  }

  public getAverageNumberOfBids(auctions: IAuction[]): number {
    return (
      auctions.reduce((total, next) => total + next.numBids, 0) /
      auctions.length
    );
  }

  public getAverageAuctionProgress(auctions: IAuction[]): number {
    let result: number = 0;
    auctions.forEach((auction) => {
      result += this.calculatePercentage(
        auction.currentHighestBidValue,
        auction.minimumRequiredAsk
      );
    });

    return result / auctions.length;
  }

  private calculatePercentage(value: number, divisor: number): number {
    return value < divisor && divisor !== 0 ? (value / divisor) * 100 : 100;
  }
}
