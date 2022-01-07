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
    this.logger.log(`${feature} : ends`);
  }
}
