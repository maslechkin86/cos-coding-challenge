import "reflect-metadata";
import { injectable } from "inversify";
import { IAuction } from "../interface/IAuction";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";

/**
 * Represent a stab for CarOnSale API client.
 */
@injectable()
export class CarOnSaleClientStab implements ICarOnSaleClient {
  private list: IAuction[] = [
    {
      id: 17618,
      label:
        "Cadillac CTS Luxury [DE - Lim4 2.0 Turbo EU5, Luxury, 2014 - 2015]",
      endingTime: new Date("2022-01-07T09:00:00.000Z"),
      state: 2,
      minimumRequiredAsk: 16900,
      currentHighestBidValue: 11100,
      numBids: 0,
    },
    {
      id: 17719,
      label: "Ford S4",
      endingTime: new Date("2022-01-10T00:46:46.241Z"),
      state: 2,
      minimumRequiredAsk: 23213,
      currentHighestBidValue: 179,
      numBids: 0,
    },
  ];

  public getRunningAuctions(): Promise<IAuction[]> {
    return new Promise((resolve) => {
      resolve(this.list);
    });
  }
}
