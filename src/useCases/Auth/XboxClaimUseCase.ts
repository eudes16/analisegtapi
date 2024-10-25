import moment from "moment";
import IContext from "../../ports/IContext";
import IUseCase from "../ports/IUseCase";
import IDataResponse from "../../dataSources/apiClient/ports/IDataResponse";
import { IXboxClaimIN } from "./port/IXboxClaimData";



export default class XboxClaimUseCase implements IUseCase<IXboxClaimIN, IDataResponse> {
   async execute(incoming: IXboxClaimIN, context: IContext): Promise<any> {
        const { prismaClient, XBLAuthApiClient, XBLApiClient } = context.dataSources;
        const { code } = incoming;

        const app_key = process.env.XBOX_API_KEY;

        const claimResponse = await XBLAuthApiClient.claim({
            code,
            app_key
        })

        if (!claimResponse.status) {
            throw new Error('Error on claim')
        }
        
        const user = await prismaClient.user.findFirst({
            where: {
                email: claimResponse.data.email
            }
        })

        if (!user) {
            throw new Error('User not found')
        }
        
        const expiresAt = moment().add(1, 'hour').toDate()

        const sessionData: any = {
            userId: user.id,
            appKey: claimResponse.data.app_key,
            expiresAt: expiresAt,

        }

        const jwt = await context.token.jwt.create(sessionData)

        const responseCreateSession = await prismaClient.session.create({
            data: {
                userId: user.id,
                appKey: claimResponse.data.app_key,
                jwt: jwt,
                expiresAt: expiresAt
            }
        })

        if (!responseCreateSession) {
            throw new Error('Error on create session')
        }

        const responseXboxUser = await XBLApiClient.searchGamertag(
            { 
                gamertag: claimResponse.data.gamertag,  
                appKey: claimResponse.data.app_key
            }, 
            context
        )

        const updateData:any = {}
        if (claimResponse.data.xuid) {
            updateData.xboxId = claimResponse.data.xuid
        }

        if (claimResponse.data.gamertag) {
            updateData.gamerTag = claimResponse.data.gamertag
        }

        if (claimResponse.data.avatar) {
            updateData.imageUrl = claimResponse.data.avatar
        }

        if (claimResponse.data.gamerScore) {
            updateData.gamerScore = responseXboxUser.data.gamerScore
        }

        if (responseXboxUser.status) {
            const xbUser = responseXboxUser.data.people[0]
            updateData.gamerScore = xbUser.gamerScore
        }

        const responseUpdateUser = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: updateData
        })

        if (!responseUpdateUser) {
            throw new Error('Error on update user')
        }

        return {
            status: true,
            data: {
                jwt,
                user: updateData
            }
        };
    }
}