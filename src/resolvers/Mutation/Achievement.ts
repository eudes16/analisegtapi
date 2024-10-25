import resolveRecordResponse from "../../shared/records/resolveRecordResponse";
import SaveAchievementsUseCase from "../../useCases/Achienvement/SaveAchievementsUseCase";

const saveAchievements = async (_: any, args: any, context: any, info: any) => {
    const useCase = new SaveAchievementsUseCase();
    const response = await useCase.execute(args, context);
    return resolveRecordResponse(response, context); 
}

export default {
    saveAchievements
}