import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "../../Logger/interface/ILogger";
import { IConfigurationHelper } from "../interface/IConfigurationHelper";

/**
 * Represent a class that manages configuration for the application.
 */
@injectable()
export class ConfigurationHelper implements IConfigurationHelper {
  private CRITICAL_VALUES_NAMES: string[] = ["USER_ID", "USER_PASSWORD"];

  public USER_ID: string =
    typeof process.env.USER_ID !== "undefined" ? process.env.USER_ID : "";

  public USER_PASSWORD: string =
    typeof process.env.USER_PASSWORD !== "undefined"
      ? process.env.USER_PASSWORD
      : "";

  public API_URL: string =
    typeof process.env.API_URL !== "undefined"
      ? process.env.API_URL
      : "https://api-core-dev.caronsale.de";

  public constructor(
    @inject(DependencyIdentifier.LOGGER)
    private logger: ILogger
  ) {}

  public validate(): void {
    const feature: string = "ConfigurationHelper : validate";
    const missingConfigValuesNames: string[] =
      ConfigurationHelper.checkConfigValues(
        this.CRITICAL_VALUES_NAMES,
        process.env
      );
    if (missingConfigValuesNames.length !== 0) {
      this.logger.log(
        `${feature} : config values missing : ${missingConfigValuesNames.join(
          ", "
        )}`
      );
      process.exit(-1);
    }
    this.logger.log(`${feature} : environment variables are valid`);
  }

  private static checkConfigValues(criticalValuesNames: string[], values: any) {
    const missingValuesNames = [];
    for (const valueName of criticalValuesNames) {
      const value = values[valueName];
      if (typeof value === "undefined" || value === "" || Number.isNaN(value)) {
        missingValuesNames.push(valueName);
      }
    }
    return missingValuesNames;
  }
}
