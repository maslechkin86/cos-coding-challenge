export interface IRequestClient {
  put(url: string, body: object, options?: object): Promise<any>;
  get(url: string, options?: object): Promise<any>;
}
