import IDataResponse from "../../../dataSources/apiClient/ports/IDataResponse";

export interface IXboxClaimIN {
    code: string
}
export interface IXboxClaimOut extends IDataResponse {}