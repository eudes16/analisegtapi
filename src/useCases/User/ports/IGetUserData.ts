import IDataResponse from "../../../dataSources/apiClient/ports/IDataResponse";
import { IGetBaseIN } from "../../ports/IGetBaseIN";
import { IGetBaseOUT } from "../../ports/IGetBaseOUT";

export interface IGetUserIN<T> extends IGetBaseIN<T> {
    filter?: {}
}

export interface IGetUserOUT extends IDataResponse, IGetBaseOUT {}