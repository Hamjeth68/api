import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Mutation: {
    bookAppointment: async (_parent: any, args: any, ctx: { prisma: { appointment: { create: (arg0: { data: any; }) => any; }; }; }, _info: any) => {
      if (ctx === null || ctx === undefined) {
        throw new Error('ctx is null or undefined');
      }
      if (ctx.prisma === null || ctx.prisma === undefined) {
        throw new Error('ctx.prisma is null or undefined');
      }
      if (ctx.prisma.appointment === null || ctx.prisma.appointment === undefined) {
        throw new Error('ctx.prisma.appointment is null or undefined');
      }
      if (args === null || args === undefined) {
        throw new Error('args is null or undefined');
      }

      return await ctx.prisma.appointment.create({ data: args });
    },

  },
  Query: {
    getAppointments: async () => {
      return await prisma.appointment.findMany();
    },
  },
};

export default resolvers;
