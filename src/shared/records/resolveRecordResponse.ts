import IDataResponse from "../../dataSources/apiClient/ports/IDataResponse";
import IContext from "../../ports/IContext";
import { IPage, IRecordResponse } from "./types";

export default function(response: IDataResponse & { count?: number }, context: IContext): IRecordResponse {

    const totalRecords = response?.count ?? 0
    const limit = context.session?.pagination?.limit ?? 10
    const currentPage = context.session?.pagination?.page ?? 1

    const page: IPage = resolveRecordsPagination(
        limit,  
        currentPage, 
        totalRecords
    )

    const message = response?.message

    return {
        data: response?.data,
        page,
        message,
    }
}

function calculateNumberOfPages(totalRecords: number, limit: number): number {
    return Math.ceil(totalRecords / limit)
}

function resolveRecordsPagination(limit: number, page: number, totalRecords: number): IPage {
    const totalPages = calculateNumberOfPages(totalRecords, limit)

    return {
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
        totalRecords,
        totalPages,
    }
}