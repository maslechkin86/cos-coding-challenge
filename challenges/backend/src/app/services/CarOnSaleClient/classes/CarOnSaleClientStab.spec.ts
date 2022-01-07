import { expect } from "chai";
import { IAuction } from "../interface/IAuction";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { CarOnSaleClientStab } from "./CarOnSaleClientStab";

describe("CarOnSaleClient", function () {
  let client: ICarOnSaleClient;

  describe("getRunningAuctions function", function () {
    it("should return array of auctions", async function () {
      // Arrange
      client = new CarOnSaleClientStab();

      // Act
      const result: IAuction[] = await client.getRunningAuctions();

      // Assert
      expect(result).to.exist;
      expect(result.length).to.gt(0);
      expect(result[0].numBids).to.be.exist;
    });
  });
});
