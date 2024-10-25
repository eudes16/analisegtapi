import IContext from "../ports/IContext";
import resolveRecordResponse from "../shared/records/resolveRecordResponse";
import GetAchievementsUseCase from "../useCases/Achienvement/GetAchievementsUseCase";
import XboxClaimUseCase from "../useCases/Auth/XboxClaimUseCase";
import GetGamesUseCase from "../useCases/Game/GetGamesUseCase";
import GetUserUseCase from "../useCases/User/GetUserUseCase";


export default {
    // Auth
    async claim(_:any, args:any, context: IContext, info:any) {
        const useCase = new XboxClaimUseCase();
        const response = await useCase.execute(args, context);
        
        if (!response.status) {
            throw new Error('Error on claim')
        }
        
        return resolveRecordResponse(response, context);
    },
    
    // Users
    async getUsers(_:any, args:any, context: IContext, info:any) {
        const useCase = new GetUserUseCase();
        const response = await useCase.execute(args, context);
        return resolveRecordResponse(response, context);
    },

    // Games
    async getGames(_:any, args:any, context: IContext, info:any) {
        const useCase = new GetGamesUseCase();
        const response = await useCase.execute(args, context);
        return resolveRecordResponse(response, context);
    },

    // Achievements
    async getAchievements(_:any, args:any, context: IContext, info:any) {
        const useCase = new GetAchievementsUseCase();
        const response = await useCase.execute(args, context);
        return resolveRecordResponse(response, context);
    }
    
    // GamerTag Reviews
}