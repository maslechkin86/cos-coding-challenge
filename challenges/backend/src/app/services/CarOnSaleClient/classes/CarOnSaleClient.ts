import "reflect-metadata";
import axios from "axios";
import { inject, injectable } from "inversify";
import { IAuction } from "../interface/IAuction";
import { IAuthenticationRequestPayload } from "../interface/IAuthenticationRequestPayload";
import { IAuthenticationResponsePayload } from "../interface/IAuthenticationResponsePayload";
import { IAuctionResponsePayload } from "../interface/IAuctionResponsePayload";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "../../Logger/interface/ILogger";

/**
 * This service retrieve auction data from the CarOnSale API.
 */
@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  private carOnSaleApiUrl = process.env.API_URL as string;

  private userId = process.env.USER_ID as string;

  private password = process.env.USER_PASSWORD as string;

  public constructor(
    @inject(DependencyIdentifier.LOGGER)
    private logger: ILogger
  ) {}

  public async getRunningAuctions(): Promise<IAuction[]> {
    const feature: string = "CarOnSaleClient : getting running auctions";
    const url = `${this.carOnSaleApiUrl}/api/v2/auction/buyer/`;
    this.logger.log(`${feature} : starts`);

    const token: string = await this.authenticate();
    try {
      const reqOptions = {
        headers: {
          authtoken: token,
          userid: this.userId,
        },
      };
      const response: any = await axios.get(url, reqOptions);
      const payload: IAuctionResponsePayload = response.data;
      this.logger.log(`${feature} : retrieved [${payload.total}] items`);
      this.logger.log(`${feature} : ends`);
      return payload.items;
    } catch (error) {
      this.logger.log(`${feature} : failed with error: ${error}`);
      throw error;
    }
  }

  private async authenticate(): Promise<string> {
    const feature: string = "CarOnSaleClient : authentication";
    const url: string = `${this.carOnSaleApiUrl}/api/v1/authentication/${this.userId}`;
    this.logger.log(`${feature} : starts`);

    try {
      const authRequest: IAuthenticationRequestPayload = {
        password: this.password,
        meta: "string",
      };
      const response: any = await axios.put(url, authRequest);
      const payload: IAuthenticationResponsePayload = response.data;
      this.logger.log(`${feature} : ends`);
      return payload.token;
    } catch (error) {
      this.logger.log(`${feature} : failed ${error}`);
      throw error;
    }
  }
}
