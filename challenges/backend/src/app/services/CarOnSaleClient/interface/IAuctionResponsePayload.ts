import { IAuction } from "./IAuction";

/**
 * Represent a body of a response for an authentication request.
 */
export interface IAuctionResponsePayload {
  items: IAuction[];
  page: number;
  total: number;
}
