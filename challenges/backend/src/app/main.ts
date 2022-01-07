import dotenv from "dotenv";
import { Container } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { Logger } from "./services/Logger/classes/Logger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { AuctionMonitorApp } from "./AuctionMonitorApp";
import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IAuctionProcessor } from "./services/Helper/interface/IAuctionProcessor";
import { AuctionProcessor } from "./services/Helper/classes/AuctionProcessor";

/*
 * Initialize the environment variables.
 */
dotenv.config();

/*
 * Create the DI container.
 */
const container = new Container({
  defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container
  .bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT)
  .to(CarOnSaleClient);
container
  .bind<IAuctionProcessor>(DependencyIdentifier.AUCTION_PROCESSOR)
  .to(AuctionProcessor);

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
  await app.start();
})();
