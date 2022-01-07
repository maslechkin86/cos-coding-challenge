import axios from 'axios';
import { injectable } from 'inversify';

@injectable()
export class RequestClient {
  public async put(url: string, body: object, config?: object): Promise<any> {
    const response: any = await axios.put(url, body, config);
    return response;
  }

  public async get(url: string, config?: object): Promise<any> {
    const response: any = await axios.get(url, config);
    return response;
  }
}
