import { Achievement, Prisma, PrismaPromise } from "../../generated/client";
import IContext from "../../ports/IContext";
import auth from "../../shared/decorators/auth";
import IUseCase from "../ports/IUseCase";
import { ISaveAchievementsIN, ISaveAchievementsOUT } from "./ports/ISaveAchievementsData";

export default class SaveAchievementsUseCase implements IUseCase<ISaveAchievementsIN, ISaveAchievementsOUT> {
    @auth()
    async execute(incoming: ISaveAchievementsIN, context: IContext): Promise<ISaveAchievementsOUT> {
        const { prismaClient } = context.dataSources
        const { achievements } = incoming

        const prismaAchievements: PrismaPromise<Achievement>[] = achievements.map((achievement) => {
            return prismaClient.achievement.upsert({
                create: {
                    currentAchievements: achievement.currentAchievements!,
                    currentGamerscore: achievement.currentGamerscore!,
                    progressPercentage: achievement.progressPercentage!,
                    totalAchievements: achievement.totalAchievements!,
                    totalGamerscore: achievement.totalGamerscore!,
                    lastTimePlayed: achievement.lastTimePlayed!,
                    gameId: achievement.gameId!,
                    userId: achievement.userId!,
                },
                update: {
                    currentAchievements: achievement.currentAchievements!,
                    currentGamerscore: achievement.currentGamerscore!,
                    progressPercentage: achievement.progressPercentage!,
                    totalAchievements: achievement.totalAchievements!,
                    totalGamerscore: achievement.totalGamerscore!,
                    lastTimePlayed: achievement.lastTimePlayed!,
                    gameId: achievement.gameId!,
                    userId: achievement.userId!,
                },
                where: {
                    userId_gameId: {
                        gameId: achievement.gameId!,
                        userId: achievement.userId!
                    }
                },
            })
        })

        const responseSave = await prismaClient.$transaction(prismaAchievements)

        return {
            data: responseSave,
            status: true
        }
    }

}