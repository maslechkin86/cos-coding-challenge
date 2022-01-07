/**
 * Represent an interface for a class that manages configuration for the application.
 */
export interface IConfigurationHelper {
  USER_ID: string;

  USER_PASSWORD: string;

  API_URL: string;

  validate(): void;
}
