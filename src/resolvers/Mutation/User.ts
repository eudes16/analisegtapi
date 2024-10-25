import resolveRecordResponse from "../../shared/records/resolveRecordResponse";
import UpdateUserAchievementsUseCase from "../../useCases/Xbl/UpdateUserAchievementsUseCase";

const createUser = async (_: any, args: any, context: any, info: any) => {
    const { prisma } = context;
    const { data } = args;

    const user = await prisma.user.create({
        data
    });

    return user;
}

const updateGamerTag = async (_: any, args: any, context: any, info: any) => {
    const { gamerTag } = args;

    const useCase = new UpdateUserAchievementsUseCase()
    const userResponse = await useCase.execute({ gamerTag }, context);

    return resolveRecordResponse(userResponse, context);
}


export default {
    // createUser, 
    updateGamerTag
}