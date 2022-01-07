import { expect } from "chai";
import sinon from "sinon";
import { IAuction } from "../interface/IAuction";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { CarOnSaleClient } from "./CarOnSaleClient";
import { Logger } from "../../Logger/classes/Logger";
import { IRequestClient } from "../../RequestClient/interfaces/IRequestClient";
import { ConfigurationHelper } from "../../Helper/classes/ConfigurationHelper";
import { ILogger } from "../../Logger/interface/ILogger";
import { IConfigurationHelper } from "../../Helper/interface/IConfigurationHelper";

describe("CarOnSaleClient", function () {
  let client: ICarOnSaleClient;
  let logger: ILogger;
  let config: IConfigurationHelper;
  let mockClient: IRequestClient;
  let putStubFn: sinon.SinonStub<any>;
  let getStubFn: sinon.SinonStub<any>;
  const auctions: IAuction[] = [
    {
      id: 17618,
      minimumRequiredAsk: 16900,
      currentHighestBidValue: 11100,
      numBids: 0,
    },
    {
      id: 17719,
      minimumRequiredAsk: 23213,
      currentHighestBidValue: 179,
      numBids: 0,
    },
  ];

  beforeEach(() => {
    logger = new Logger();
    config = new ConfigurationHelper(logger);
    putStubFn = sinon.stub().resolves({
      data: {
        token: "token",
      },
    });
    getStubFn = sinon.stub().resolves({
      data: {
        total: 2,
        page: 1,
        items: auctions,
      },
    });
    mockClient = {
      put: putStubFn,
      get: getStubFn,
    } as IRequestClient;
  });

  describe("getRunningAuctions function", function () {
    it("should return array of auctions", async function () {
      // Arrange
      client = new CarOnSaleClient(logger, config, mockClient);

      // Act
      const result: IAuction[] = await client.getRunningAuctions();

      // Assert
      expect(result).to.eql(auctions);
      sinon.assert.calledOnce(putStubFn);
      sinon.assert.calledOnce(getStubFn);
    });

    it("should throw error if authentication failed", async function () {
      // Arrange
      mockClient = {
        put: sinon.stub().rejects("error"),
        get: getStubFn,
      } as IRequestClient;
      client = new CarOnSaleClient(logger, config, mockClient);

      // Act
      let error: Error | undefined;
      try {
        await client.getRunningAuctions();
      } catch (err) {
        error = err;
      }

      // Assert
      expect(error).to.be.exist;
    });

    it("should throw error if retrieving auctions request failed", async function () {
      // Arrange
      mockClient = {
        put: putStubFn,
        get: sinon.stub().rejects("error"),
      } as IRequestClient;
      client = new CarOnSaleClient(logger, config, mockClient);

      // Act
      let error: Error | undefined;
      try {
        await client.getRunningAuctions();
      } catch (err) {
        error = err;
      }

      // Assert
      expect(error).to.be.exist;
      sinon.assert.calledOnce(putStubFn);
    });
  });
});
