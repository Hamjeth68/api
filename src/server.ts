
// Use ES6 import syntax consistently
const express = require('express');
import { ApolloServer, gql } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { DocumentNode } from 'graphql';
const cors = require('cors');
// Initialize environment variables
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient();

// GraphQL type definitions
const typeDefs = gql`
  type Query {
    appointments: [Appointment!]!
    appointment(id: ID!): Appointment
  }

  type Mutation {
    createAppointment(name: String!, email: String!, date: String!, time: String!): Appointment!
    updateAppointment(id: ID!, name: String, email: String, date: String, time: String): Appointment!
    deleteAppointment(id: ID!): Appointment
  }

  type Appointment {
    id: ID!
    name: String!
    email: String!
    date: String!
    time: String!
  }
`;

// Resolvers with input validation and error handling
const resolvers = {
  Query: {
    appointments: async () => {
      return prisma.appointment.findMany();
    },
    appointment: async (_root: any, { id }: any) => {
      return prisma.appointment.findUnique({
        where: { id: parseInt(id) }
      });
    }
  },
  Mutation: {
    createAppointment: async (_root: any, { name, email, date, time }: any) => {
      return prisma.appointment.create({
        data: { name, email, date, time },
      });
    },
    updateAppointment: async (_root: any, { id, name, email, date, time }: any) => {
      return prisma.appointment.update({
        where: { id: parseInt(id) },
        data: { name, email, date, time },
      });
    },
    deleteAppointment: async (_root: any, { id }: any) => {
      return prisma.appointment.delete({
        where: { id: parseInt(id) }
      });
    },
  },
};

/**
 * Function to start the Apollo Server and Express application.
 * 
 * @param typeDefs - The GraphQL schema definition.
 * @param resolvers - The GraphQL resolvers.
 * @returns {Promise<void>} - A promise that resolves when the server is started.
 */
// Function to start the Apollo Server and Express application
async function startApolloServer(typeDefs: DocumentNode, resolvers: any): Promise<void> {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  app.use((_req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) => {
    res.header('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.use(
    cors({
      optionsSuccessStatus: 200, //option sucess status
      origin: "http://localhost:4000", //origin allowed to access the server
    })
  );
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

// Start the server
startApolloServer(typeDefs, resolvers);
