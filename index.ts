import app from "./src/app";
import "reflect-metadata";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { resolvers } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const prisma = new PrismaClient();

  // ... Building schema here
  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  // Create the GraphQL server
  const server = new ApolloServer({
    schema,
    context: () => ({ prisma }),
  });

  //server.applyMiddleware({ app });

  // Start the server
  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
