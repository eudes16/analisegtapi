import IDataResponse from "../../../dataSources/apiClient/ports/IDataResponse"

export interface IUpdateGameIN {
    data: IUpdateGameData[]

}

export interface IUpdateGameOUT extends IDataResponse {

}


export interface IUpdateGameData {
    id?: number
    titleId: string
    name: string
    devices: string[]
    displayImage: string
    createdAt?: string
    updatedAt?: string
}

export interface Achievement {
    currentAchievements: number
    totalAchievements: number
    currentGamerscore: number
    totalGamerscore: number
    progressPercentage: number
    sourceVersion: number
}