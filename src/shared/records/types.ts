export interface IRecordResponse<T = any> {
    data: T
    page: IPage
    message?: string[]
}

export interface IPage {
    totalRecords: number
    currentPage: number
    totalPages: number
    nextPage: number | null
    previousPage: number | null
}

