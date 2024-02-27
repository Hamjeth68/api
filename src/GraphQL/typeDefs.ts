import { gql } from "apollo-server-express";

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
      build: String!
      whatToBuild: String!
      website: String!
      contactNumber: String!
    ): Appointment!
  }

  type Appointment {
    id: Int!
    name: String!
    email: String!
    date: String!
    time: String!
    build: String!
    whatToBuild: String!
    website: String!
    contactNumber: String!
  }
`;

export default typeDefs;
