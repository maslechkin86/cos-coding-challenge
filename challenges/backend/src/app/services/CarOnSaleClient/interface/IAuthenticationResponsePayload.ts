/**
 * Represent a body of a response for an authentication request.
 */
export interface IAuthenticationResponsePayload {
  token: string;
  authenticated: boolean;
  userId: string;
  internalUserId: number;
  internalUserUUID: string;
  type: number;
  privileges: string;
}
