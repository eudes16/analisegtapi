import { PrismaClient } from "../generated/client"
import { IXBLAuthApiClient } from "../dataSources/XBLAuthApiClient"
import { IXBLApiClient } from "../dataSources/XBLApiClient"


export default interface IContext {
    token: {
        session: string,
        jwt: {
            create: (payload: any) => Promise<string>
            validate: (token: string) => Promise<any>
        }
    }
    dataSources: {
        prismaClient: PrismaClient
        XBLAuthApiClient: IXBLAuthApiClient
        XBLApiClient: IXBLApiClient
    }
    session?: ISession
}

export interface ISession {
    user?: IAuthUser
    pagination?: {
        limit: number
        page: number
    }
}


export interface IAuthUser {
    email: string
    token: string
    appKey: string
    xboxId: string
    gamerTag: string
}