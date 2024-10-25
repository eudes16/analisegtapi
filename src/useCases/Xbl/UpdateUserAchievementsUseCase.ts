import IDataRequest from "../../dataSources/apiClient/ports/IDataRequest";
import IDataResponse from "../../dataSources/apiClient/ports/IDataResponse";
import { Game } from "../../generated/client";
import IContext from "../../ports/IContext";
import auth from "../../shared/decorators/auth";
import SaveAchievementsUseCase from "../Achienvement/SaveAchievementsUseCase";
import { SaveGame } from "../Game/ports/ISaveGamesData";
import SaveGamesUseCase from "../Game/SaveGamesUseCase";
import IUseCase from "../ports/IUseCase";
import { SaveUser } from "../User/ports/ISaveUserData";
import SaveUserUseCase from "../User/SaveUserUseCase";
import { AchievementsResponse } from "./port/IGetAchievements";
import { IUpdateUserAchievementsIN, IUpdateUserAchievementsOUT } from "./port/IUpdateUserAchievements";

export default class UpdateUserAchievementsUseCase implements IUseCase<IUpdateUserAchievementsIN, IUpdateUserAchievementsOUT> {
    @auth()
    async execute(data: any, context: IContext): Promise<IDataResponse> {
        const { gamerTag } = data;
        const { prismaClient, XBLApiClient } = context.dataSources;

        const user = await prismaClient.user.findFirst({
            where: {
                gamerTag
            }
        })

        let xbUser: any = user || null

        if (!user) {
            const xboxUserResponse = await XBLApiClient.searchGamertag({ gamertag: gamerTag }, context)    
            if (!xboxUserResponse.status) {
                throw new Error('Error on search gamertag')
            }
            xbUser = xboxUserResponse.data.people[0]

            const userSave: SaveUser = {
                gamerScore: xbUser.gamerScore,
                gamerTag: xbUser.gamertag,
                xboxId: xbUser.id,
            } 

            const saveUserUseCase = new SaveUserUseCase()
            const saveUserResponse = await saveUserUseCase.execute({ users: [userSave] }, context)
            
            if (!saveUserResponse.status) {
                throw new Error('Error on save user')
            }
        }

        if (xbUser.xboxId) {
            const gamesToSave: any[] = []
            const achievementsToSave: any[] = []

            const achievementsResponse = await XBLApiClient.getAcheivements({ xboxId: xbUser.xboxId }, context)
            
            if (!achievementsResponse.status) {
                throw new Error('Error on get achievements')
            }

            const achievements: AchievementsResponse = achievementsResponse.data

            achievements.titles.forEach((title) => {
                gamesToSave.push({
                    name: title.name,
                    titleId: +title.titleId,
                    displayImage: title.displayImage,
                    devices: title.devices,
                })

                
            })

            const saveGamesUseCase = new SaveGamesUseCase()
            const saveGamesResponse: IDataResponse<Game[]> = await saveGamesUseCase.execute({ games: gamesToSave }, context)

            if (!saveGamesResponse.status) {
                throw new Error('Error on save games')
            }
            
            saveGamesResponse.data.forEach((game) => {
                const titleAchievement = achievements.titles.find((title) => +title.titleId === +game.titleId)

                achievementsToSave.push({
                    gameId: game.id,
                    currentAchievements: titleAchievement?.achievement.currentAchievements,
                    totalAchievements: titleAchievement?.achievement.totalAchievements,
                    currentGamerscore: titleAchievement?.achievement.currentGamerscore,
                    totalGamerscore: titleAchievement?.achievement.totalGamerscore,
                    progressPercentage: titleAchievement?.achievement.progressPercentage,
                    userId: xbUser.id,
                    lastTimePlayed: titleAchievement?.titleHistory.lastTimePlayed,
                })
            })

            const saveAchievementsUseCase = new SaveAchievementsUseCase()
            const saveAchievementsResponse = await saveAchievementsUseCase.execute({ achievements: achievementsToSave }, context)

            if (!saveAchievementsResponse.status) {
                throw new Error('Error on save achievements')
            }
        }

        return {
            status: true,
            data: xbUser
        }
    }
}