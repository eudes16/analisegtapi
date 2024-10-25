import IContext from "../../ports/IContext";
import auth from "../../shared/decorators/auth";
import IUseCase from "../ports/IUseCase";
import { IGetAchievementDataIN, IGetAchievementDataOUT } from "./ports/IGetAchievementData";

export default class GetAchievementsUseCase implements IUseCase<IGetAchievementDataIN, IGetAchievementDataOUT> {
    @auth()
    async execute(incoming: IGetAchievementDataIN, context: IContext): Promise<IGetAchievementDataOUT> {
        const { prismaClient } = context.dataSources;
        const { filter } = incoming;

        const where: any =  {}
        const response = prismaClient.achievement.findMany({
            where
        })

        return {
            data: response,
            status: true
        }
    }

}