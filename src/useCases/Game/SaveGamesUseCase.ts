import { Game, PrismaPromise } from "../../generated/client";
import IContext from "../../ports/IContext";
import auth from "../../shared/decorators/auth";
import IUseCase from "../ports/IUseCase";
import { ISaveGamesIn, ISaveGamesOut } from "./ports/ISaveGamesData";

export default class SaveGamesUseCase implements IUseCase<ISaveGamesIn, ISaveGamesOut> {
    @auth()
    async execute(incoming: ISaveGamesIn, context: IContext): Promise<ISaveGamesOut> {
        const { prismaClient } = context.dataSources
        const { games } = incoming

        const gamesToSave: PrismaPromise<Game>[] = games.map((game) => {
            return prismaClient.game.upsert({
                create: {
                    name: game.name!,
                    titleId: game.titleId!,
                    displayImage: game.displayImage!,
                    devices: game.devices!,
                },
                update: {
                    name: game.name!,
                    titleId: game.titleId!,
                    displayImage: game.displayImage!,
                    devices: game.devices!,
                },
                where: {
                    titleId: game.titleId!,
                },
            })
        })

        const responseSave = await prismaClient.$transaction(gamesToSave)

        return {
            data: responseSave,
            status: true
        }
    }
}