// server.ts

const express = require("express");
import { ApolloServer, gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { DocumentNode } from "graphql";
import cors from "cors";

dotenv.config();

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    getAppointments: [Appointment!]!
  }

  type Mutation {
    bookAppointment(
      name: String!
      email: String!
      date: String!
      time: String!
    ): Appointment!
  }

  type Appointment {
    id: ID!
    name: String!
    email: String!
    date: String!
    time: String!
  }
`;

const resolvers = {
  Mutation: {
    bookAppointment: async (
      _parent: any,
      args: any,
      _context: any,
      _info: any
    ) => {
      const { name, email, date, time } = args;
      return await prisma.appointment.create({
        data: {
          name,
          email,
          date,
          time,
        },
      });
    },
  },
};

async function startApolloServer(
  typeDefs: DocumentNode,
  resolvers: any
): Promise<void> {
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

startApolloServer(typeDefs, resolvers);
