import IDataResponse from "../../../dataSources/apiClient/ports/IDataResponse";

export interface IUpdateUserAchievementsIN {
    gamerTag: string
}

export interface IUpdateUserAchievementsOUT extends IDataResponse {}