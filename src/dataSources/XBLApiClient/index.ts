import IContext from "../../ports/IContext"
import { AchievementsResponse } from "../../useCases/Xbl/port/IGetAchievements"
import IApi from "../apiClient/ports/IApi"
import IDataResponse from "../apiClient/ports/IDataResponse"


export interface IXBLApiClient {
    getAcheivements(data: any, context: IContext): Promise<IDataResponse>
    searchGamertag(data: any, context: IContext): Promise<IDataResponse>
}

class XBLApiClient implements IXBLApiClient {

    constructor(private client: IApi) {}

    async getAcheivements(data: any, context: IContext): Promise<IDataResponse<AchievementsResponse>> {
        const { appKey } = context?.session?.user!
        const { xboxId } = data
        
        if (!appKey) {
            throw new Error('App key not found')
        }

        const request = {
            url: `/achievements/player/${xboxId}`,
            headers: {
                'X-Authorization': appKey,
            }
        }

        const response = await this.client.get(request)
        return response
    }

    async searchGamertag(data: any, context: IContext): Promise<IDataResponse> {
        const appKey = context?.session?.user ?? data.appKey ?? ''
        const { gamertag } = data

        if (!appKey) {
            throw new Error('App key not found')
        }

        const request = {
            url: `/search/${gamertag}`,
            headers: {
                'X-Authorization': appKey,
            }
        }

        const response = await this.client.get(request)

        return response
    }
}

export { XBLApiClient }