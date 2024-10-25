import IDataResponse from "../../dataSources/apiClient/ports/IDataResponse";
import { User } from "../../generated/client";
import IContext from "../../ports/IContext";
import auth from "../../shared/decorators/auth";
import { QueryFilter } from "../../shared/records/ports/IFilter";
import resolveFields from "../../shared/records/resolveFields";
import resolveFilters from "../../shared/records/resolveFilters";
import resolveIncludes from "../../shared/records/resolveIncludes";
import resolveOrderBy from "../../shared/records/resolveOrderBy";
import IUseCase from "../ports/IUseCase";
import { IGetUserIN, IGetUserOUT } from "./ports/IGetUserData";

export default class GetUserUseCase implements IUseCase<IGetUserIN<User>, IGetUserOUT> {
    @auth()
    async execute(incoming: any, context: IContext): Promise<IGetUserOUT> {
        const { fields, includes, filter, pagination, orderBy: order } = incoming;
        const { prismaClient } = context.dataSources
        const options: any = {}

        
        const qf: QueryFilter = {
            ... filter
        }
        
        const where: any =  resolveFilters(qf, "findMany")
        
        const orderBy: any = resolveOrderBy(order as any)
        
        const query: any = {
            where, 
            orderBy
        }
        
        resolveFields(fields, query);
        resolveIncludes(includes, query);

        const queryPagination: any = {
            where
        }

        if (pagination) {
            query['take'] = pagination.limit
            query['skip'] = pagination.limit * (pagination.page - 1)
        }
        
        const [usersResult, count] = await prismaClient.$transaction([
            prismaClient.user.findMany(query),
            prismaClient.user.count(queryPagination)
        ]) 

        return {
            data: usersResult as any,
            count: count,
            status: true,
        }
    }
}



