export default interface  IDataResponse<T = any> {
    data: T
    status: boolean
    code?: number
    message?: string[]
}