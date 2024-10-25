import IDataResponse from "../../../dataSources/apiClient/ports/IDataResponse";
import { IGetBaseIN } from "../../ports/IGetBaseIN";
import { TFields } from "../../ports/IUseCase";

export interface IGetGamesUseCaseIN<T> extends IGetBaseIN<T> {
    
}

export interface IGetGamesUseCaseOUT extends IDataResponse {
    count?: number
}