import { PrismaPromise, User } from "../../generated/client";
import IContext from "../../ports/IContext";
import auth from "../../shared/decorators/auth";
import IUseCase from "../ports/IUseCase";
import { ISaveUserIN, ISaveUserOUT } from "./ports/ISaveUserData";

export default class SaveUserUseCase implements IUseCase<ISaveUserIN, ISaveUserOUT> {
    @auth()
    async execute(incoming: ISaveUserIN, context: IContext): Promise<ISaveUserOUT> {
        const { prismaClient } = context.dataSources
        const { users } = incoming

        const usersToSave: PrismaPromise<User>[] = users.map((user) => {
            return prismaClient.user.upsert({
                create: {
                    name: user.name!,
                    email: user.email!,
                    gamerTag: user.gamerTag!,
                    gamerScore: user.gamerScore!,
                    imageUrl: user.imageUrl!,
                    xboxId: user.xboxId!,
                    createdAt: user.createdAt!,
                    updatedAt: user.updatedAt!,
                },
                update: {
                    name: user.name!,
                    email: user.email!,
                    gamerTag: user.gamerTag!,
                    gamerScore: user.gamerScore!,
                    imageUrl: user.imageUrl!,
                    xboxId: user.xboxId!,
                    createdAt: user.createdAt!,
                    updatedAt: user.updatedAt!,
                },
                where: {
                    // id: user.id!,
                    gamerTag: user.gamerTag!,
                },
            })
        })

        const responseSave = await prismaClient.$transaction(usersToSave)
        
        return {
            data: responseSave,
            status: true
        }
    }

}