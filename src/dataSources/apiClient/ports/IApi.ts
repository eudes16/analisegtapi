import IDataRequest from "./IDataRequest";
import IDataResponse from "./IDataResponse";

export default interface IApi {
    get(request: IDataRequest): Promise<IDataResponse>
    post(request: IDataRequest): Promise<IDataResponse>
    put(request: IDataRequest): Promise<IDataResponse>
    delete(request: IDataRequest): Promise<IDataResponse>
}