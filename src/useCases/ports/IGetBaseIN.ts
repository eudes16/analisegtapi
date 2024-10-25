import { TFields } from "./IUseCase"

export interface IGetBaseIN<T> {
    fields?: TFields<T> 
    filter?: {}
    pagination?: {
        limit: number
        page: number
    }
    orderBy?: any[]
}