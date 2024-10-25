import IApi from "../apiClient/ports/IApi";
import IDataRequest from "../apiClient/ports/IDataRequest";

export interface IXBLAuthApiClient {
    claim(data: any): Promise<any>;
}

export default class XBLAuthApiClient implements IXBLAuthApiClient {

    constructor(private client: IApi) {}

    async claim(data: any): Promise<any> {
        const { code, app_key } = data
        const request: IDataRequest = {
            url: '/claim',
            data: {
                code,
                app_key
            },
        }
        
        const response = await this.client.post(request)

        return response;
    }
}