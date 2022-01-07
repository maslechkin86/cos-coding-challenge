import "reflect-metadata";
import { injectable } from "inversify";
import { IAuction } from "../interface/IAuction";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";

/**
 * Represent a stub for CarOnSale API client.
 */
@injectable()
export class CarOnSaleClientStub implements ICarOnSaleClient {
  private list: IAuction[] = [
    {
      id: 17618,
      minimumRequiredAsk: 16900,
      currentHighestBidValue: 11100,
      numBids: 10,
    },
    {
      id: 17719,
      minimumRequiredAsk: 23213,
      currentHighestBidValue: 179,
      numBids: 5,
    },
  ];

  public getRunningAuctions(): Promise<IAuction[]> {
    return new Promise((resolve) => {
      resolve(this.list);
    });
  }
}
