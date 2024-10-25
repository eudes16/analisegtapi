require('dotenv').config();
import { loadFiles } from "@graphql-tools/load-files";
import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
loadFiles('src/schemas/**/*.graphql').then((files) => {
    const server = new ApolloServer({
        typeDefs: files,
        resolvers: resolvers
    });
    // @ts-ignore
    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
});
