import { expect } from "chai";
import { IAuction } from "../../CarOnSaleClient/interface/IAuction";
import { IAuctionProcessor } from "../interface/IAuctionProcessor";
import { AuctionProcessor } from "./AuctionProcessor";

describe("AuctionProcessor", function () {
  let processor: IAuctionProcessor;

  describe("getAverageNumberOfBids function", function () {
    it("should return an expected value", async function () {
      // Arrange
      processor = new AuctionProcessor();
      const auctions: IAuction[] = [
        {
          numBids: 10,
        } as IAuction,
        {
          numBids: 5,
        } as IAuction,
      ];

      // Act
      const result: number = processor.getAverageNumberOfBids(auctions);

      // Assert
      const expectedValue: number =
        (auctions[0].numBids + auctions[1].numBids) / auctions.length;
      expect(result).to.eq(expectedValue);
    });

    it("should return an expected value for the empty auctions array", async function () {
      // Arrange
      processor = new AuctionProcessor();
      const auctions: IAuction[] = [];

      // Act
      const result: number = processor.getAverageNumberOfBids(auctions);

      // Assert
      const expectedValue: number = 0;
      expect(result).to.eq(expectedValue);
    });
  });

  describe("getAverageAuctionProgress function", function () {
    it("should return an expected value", async function () {
      // Arrange
      processor = new AuctionProcessor();
      const auctions: IAuction[] = [
        {
          currentHighestBidValue: 50,
          minimumRequiredAsk: 100,
        } as IAuction,
        {
          currentHighestBidValue: 20,
          minimumRequiredAsk: 100,
        } as IAuction,
      ];

      // Act
      const result: number = processor.getAverageAuctionProgress(auctions);

      // Assert
      const firstAuction: number =
        (auctions[0].currentHighestBidValue / auctions[0].minimumRequiredAsk) *
        100;
      const secondAuction: number =
        (auctions[1].currentHighestBidValue / auctions[1].minimumRequiredAsk) *
        100;
      const expectedValue: number =
        (firstAuction + secondAuction) / auctions.length;
      expect(result).to.eq(expectedValue);
    });

    it("should return an expected value if the highest bid is more than the minimum required", async function () {
      // Arrange
      processor = new AuctionProcessor();
      const auctions: IAuction[] = [
        {
          currentHighestBidValue: 50,
          minimumRequiredAsk: 100,
        } as IAuction,
        {
          currentHighestBidValue: 120,
          minimumRequiredAsk: 100,
        } as IAuction,
      ];

      // Act
      const result: number = processor.getAverageAuctionProgress(auctions);

      // Assert
      const firstAuction: number =
        (auctions[0].currentHighestBidValue / auctions[0].minimumRequiredAsk) *
        100;
      const secondAuction: number = 100;
      const expectedValue: number =
        (firstAuction + secondAuction) / auctions.length;
      expect(result).to.eq(expectedValue);
    });
  });
});
