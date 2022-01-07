import { IAuctionResponsePayloadItem } from "./IAuctionResponsePayloadItem";

/**
 * Represent a body of a response for an authentication request.
 */
export interface IAuctionResponsePayload {
  items: IAuctionResponsePayloadItem[];
  page: number;
  total: number;
}
