import { ApiAxios } from "../dataSources/apiClient";
import prismaClient from "../dataSources/prismaClient";
import { XBLApiClient } from "../dataSources/XBLApiClient";
import XBLAuthApiClient from "../dataSources/XBLAuthApiClient";
import IContext from "../ports/IContext";
import generateToken from "../shared/jwt/generateToken";
import { validateToken } from "../shared/jwt/validateToken";

const ContextMiddlewareResolver = ({ req }: any) => {
    const token = req.headers.authorization || ''
    const pagination = req.body.variables?.pagination || { limit: 10, page: 1 }

    return {
        token: {
            session: token,
            jwt: {
                create: async (payload: any) => {
                    return generateToken(payload, process.env.JWT_SECRET!, "1d")
                },
                validate: validateToken
            }
        },
        dataSources: {
            prismaClient,
            XBLAuthApiClient: new XBLAuthApiClient(
                new ApiAxios(
                    process.env.XBOX_API_AUTH_URL!,
                    { 'Content-Type': 'application/json' }
                )
            ),
            XBLApiClient: new XBLApiClient(
                new ApiAxios(
                    process.env.XBOX_API_URL!,
                    {
                        'Content-Type': 'application/json',
                        'X-Contract': 100,
                    }
                )
            )
        },
        session: {
            pagination
        }
    } as IContext
}

export default ContextMiddlewareResolver;