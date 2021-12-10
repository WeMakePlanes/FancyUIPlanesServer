import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground as ApolloPlayGround } from "apollo-server-core";
import express from "express";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import "reflect-metadata";
import { resolvers } from "@generated/type-graphql";

const main = async () => {
    const PORT: string | number = process.env.PORT || 8080;
    const prisma: PrismaClient = new PrismaClient();

    const schema = await buildSchema({
        resolvers: resolvers,
        emitSchemaFile: true,
        validate: false,
    });

    const server = new ApolloServer({
        schema,
        plugins: [ApolloPlayGround],
        context: {
            prisma
        }
    });

    await server.start();

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    server.applyMiddleware({
        app,
        path: "/graphql"
    });

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
}

main().catch(err => console.log(err));