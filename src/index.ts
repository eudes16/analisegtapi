require('dotenv').config()

import { loadFiles } from "@graphql-tools/load-files"
import { ApolloServer } from "apollo-server"
import resolvers from "./resolvers"
import ContextMiddlewareResolver from "./middlewares/ContextMiddleware"

loadFiles('src/schemas/**/*.graphql').then((files) => {

    const server:ApolloServer = new ApolloServer(
        {
            typeDefs: files ,
            resolvers: resolvers,
            context: ContextMiddlewareResolver
        }
    )
    
    // @ts-ignore
    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`)
    })
})
