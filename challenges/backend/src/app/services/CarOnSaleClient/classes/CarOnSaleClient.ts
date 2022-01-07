import "reflect-metadata";
import axios from "axios";
import { injectable } from "inversify";
import { IAuction } from "../interface/IAuction";
import { IAuthenticationRequestPayload } from "../interface/IAuthenticationRequestPayload";
import { IAuthenticationResponsePayload } from "../interface/IAuthenticationResponsePayload";
import { IAuctionResponsePayload } from "../interface/IAuctionResponsePayload";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";

/**
 * This service retrieve auction data from the CarOnSale API.
 */
@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  private carOnSaleApiUrl = process.env.API_URL as string;

  private userId = process.env.USER_ID as string;

  private password = process.env.USER_PASSWORD as string;

  public async getRunningAuctions(): Promise<IAuction[]> {
    const url = `${this.carOnSaleApiUrl}/api/v2/auction/buyer/`;

    const token: string = await this.authenticate();

    const reqOptions = {
      headers: {
        authtoken: token,
        userid: this.userId,
      },
    };
    const response: any = await axios.get(url, reqOptions);
    const payload: IAuctionResponsePayload = response.data;
    return payload.items;
  }

  private async authenticate(): Promise<string> {
    const url: string = `${this.carOnSaleApiUrl}/api/v1/authentication/${this.userId}`;

    const authRequest: IAuthenticationRequestPayload = {
      password: this.password,
      meta: "string",
    };
    const response: any = await axios.put(url, authRequest);
    const payload: IAuthenticationResponsePayload = response.data;
    return payload.token;
  }
}
