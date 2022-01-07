/**
 * Represent a body of an authentication request.
 */
export interface IAuthenticationRequestPayload {
  password: string;
  meta?: string;
}
