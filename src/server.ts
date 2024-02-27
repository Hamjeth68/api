const express = require("express");
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import cors from "cors";
import typeDefs from "./GraphQL/typeDefs";
import resolvers from "./GraphQL/resolvers";

dotenv.config();

async function startApolloServer(): Promise<void> {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  app.use(cors());
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
}

startApolloServer();
