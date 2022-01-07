import { inject, injectable } from "inversify";
import "reflect-metadata";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IAuction } from "./services/CarOnSaleClient/interface/IAuction";
import { IAuctionProcessor } from "./services/Helper/interface/IAuctionProcessor";
import { IConfigurationHelper } from "./services/Helper/interface/IConfigurationHelper";

@injectable()
export class AuctionMonitorApp {
  public constructor(
    @inject(DependencyIdentifier.LOGGER)
    private logger: ILogger,
    @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT)
    private client: ICarOnSaleClient,
    @inject(DependencyIdentifier.AUCTION_PROCESSOR)
    private processor: IAuctionProcessor,
    @inject(DependencyIdentifier.CONFIG)
    private config: IConfigurationHelper
  ) {}

  public async start(): Promise<void> {
    const feature: string = "Auction Monitor";
    this.logger.log(`${feature} : starts`);

    this.config.validate();

    const auctions: IAuction[] = await this.client.getRunningAuctions();
    this.logger.log(`${feature} : number of auctions: ${auctions.length}`);
    const averageNumberOfBids: number =
      this.processor.getAverageNumberOfBids(auctions);
    this.logger.log(
      `${feature} : average number of bids: ${averageNumberOfBids}`
    );
    const averageAuctionProgress: number =
      this.processor.getAverageAuctionProgress(auctions);
    this.logger.log(
      `${feature} : average auction progress: ${averageAuctionProgress}`
    );

    this.logger.log(`${feature} : ends`);
  }
}
