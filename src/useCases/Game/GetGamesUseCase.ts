import { Game } from "../../generated/client";
import IContext from "../../ports/IContext";
import auth from "../../shared/decorators/auth";
import { QueryFilter } from "../../shared/records/ports/IFilter";
import resolveFields from "../../shared/records/resolveFields";
import resolveFilters from "../../shared/records/resolveFilters";
import resolveOrderBy from "../../shared/records/resolveOrderBy";
import IUseCase from "../ports/IUseCase";
import { IGetGamesUseCaseIN, IGetGamesUseCaseOUT } from "./ports/IGetGamesUseCaseData";

export default class GetGamesUseCase implements IUseCase<IGetGamesUseCaseIN<Game>, IGetGamesUseCaseOUT> {
    // @auth()
    async execute(incoming: IGetGamesUseCaseIN<Game>, context: IContext): Promise<IGetGamesUseCaseOUT> {
        const { prismaClient } = context.dataSources;
        const { fields, filter, pagination, orderBy: order } = incoming;

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

        const queryPagination: any = {
            where
        }
        
        if (pagination) {
            query['take'] = pagination.limit
            query['skip'] = pagination.limit * (pagination.page - 1)
        }
        
        const [games, count] = await prismaClient.$transaction([
            prismaClient.game.findMany(query),
            prismaClient.game.count(queryPagination)
        ])

        return {
            data: games,
            count: count,
            status: true
        }
    }
}