import IDataResponse from "../../../dataSources/apiClient/ports/IDataResponse";

export interface ISaveAchievementsIN {
    achievements: SaveAchievement[]
}

export interface ISaveAchievementsOUT extends IDataResponse {

}


export interface Achievements {
    id:                  number;
    gameId:              number;
    currentAchievements: number;
    totalAchievements:   number;
    currentGamerscore:   number;
    totalGamerscore:     number;
    progressPercentage:  number;
    lastTimePlayed:       Date;
    userId:              number;
    createdAt:           Date;
    updatedAt:           null;
}

export interface SaveAchievement extends Partial<Achievements> {}
