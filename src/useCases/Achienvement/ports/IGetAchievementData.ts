import IDataResponse from "../../../dataSources/apiClient/ports/IDataResponse";

export interface IGetAchievementDataIN {
    filter?: {}
}

export interface IGetAchievementDataOUT extends IDataResponse {

}
