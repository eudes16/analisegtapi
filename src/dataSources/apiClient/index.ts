import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import IApi from "./ports/IApi";
import IDataRequest from "./ports/IDataRequest";
import IDataResponse from "./ports/IDataResponse";

class ApiAxios implements IApi {
    private client: AxiosInstance

    constructor(baseUrl: string, headers?: any) {
        this.client = axios.create({
            baseURL: baseUrl,
            headers
        })
    }

    async get(request: IDataRequest): Promise<IDataResponse> {
        try {

            const options: AxiosRequestConfig = {}

            if (request.headers) {
                options.headers = {...options.headers, ...request.headers}
            }

            const response = await this.client.get(request.url, options)

            return {
                status: true,
                code: response.status,
                data: response.data
            }
        } catch (error: any) {
            return {
                status: false,
                code: error?.message || 500,
                data: null
            }
        }
    }

    async post(request: IDataRequest): Promise<IDataResponse> {
        try {
            const options: AxiosRequestConfig = {}

            if (request.headers) {
                options.headers = {...options.headers, ...request.headers}
            }

            const response = await this.client.post(request.url, request.data, options)

            return {
                status: true,
                code: response.status,
                data: response.data
            }
        } catch (error: any) {
            return {
                status: false,
                code: error?.message || 500,
                data: null
            }
        }
    }

    put(request: IDataRequest): Promise<IDataResponse> {
        throw new Error("Method not implemented.");
    }

    delete(request: IDataRequest): Promise<IDataResponse> {
        throw new Error("Method not implemented.");
    }

    
}

const apiClient = new ApiAxios(
    process.env.XBOX_API_AUTH_URL || 'http://localhost:3000',
    {
        'Content-Type': 'application/json',
    }
)
const xblApiClient = new ApiAxios(
    process.env.XBOX_API_URL || 'http://localhost:3000',
    {
        'Content-Type': 'application/json',
        'X-Contract': 100,
    }
)


export { apiClient, xblApiClient, ApiAxios }