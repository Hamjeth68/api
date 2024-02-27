import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Mutation: {
    bookAppointment: async (
      _parent: any,
      args: any,
      _context: any,
      _info: any
    ) => {
      return await prisma.appointment.create({
        data: args,
      });
    },
  },
  Query: {
    getAppointments: async () => {
      return await prisma.appointment.findMany();
    },
  },
};

export default resolvers;
