import IContext from "../../ports/IContext";
import auth from "../../shared/decorators/auth";
import IUseCase from "../ports/IUseCase";
import { IUpdateGameIN, IUpdateGameOUT } from "./port/IUpdateGameData";

export default class UpdateGameUseCase implements IUseCase<IUpdateGameIN, IUpdateGameOUT> {
    @auth()
    async execute(incoming: IUpdateGameIN, context: IContext): Promise<IUpdateGameOUT> {
        const { prismaClient } = context.dataSources;
        const { data } = incoming;

        const saves: any = data.map((game) => {
            return prismaClient.game.upsert({
                where: {
                    id: game.id
                },
                create: {
                    name: game.name,
                    titleId: +game.titleId,
                    displayImage: game.displayImage,
                    devices: {
                        set: game.devices
                    },
                },
                update: {
                    name: game.name,
                    titleId: +game.titleId,
                    displayImage: game.displayImage,
                    devices: {
                        set: game.devices
                    },
                }
            })
        })

        const responseUpdates = await prismaClient.$transaction([
            saves
        ])

        return {
            status: true,
            data: responseUpdates,
        }
    }
}