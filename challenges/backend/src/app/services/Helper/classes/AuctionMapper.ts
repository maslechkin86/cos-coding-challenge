import { IAuctionResponsePayloadItem } from "../../CarOnSaleClient/interface/IAuctionResponsePayloadItem";
import { IAuction } from "../../CarOnSaleClient/interface/IAuction";

export class AuctionMapper {
  public static toAuctionArray(
    items: IAuctionResponsePayloadItem[]
  ): IAuction[] {
    return items.map((item: IAuctionResponsePayloadItem) =>
      AuctionMapper.toAuction(item)
    );
  }

  public static toAuction(data: IAuctionResponsePayloadItem): IAuction {
    return {
      id: data.id,
      numBids: data.numBids,
      minimumRequiredAsk: data.minimumRequiredAsk,
      currentHighestBidValue: data.currentHighestBidValue,
    };
  }
}
