import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        appointments: async () => {
            return await prisma.appointment.findMany();
        },
    },
    Mutation: {
        bookConsultation: async (_: any, { input }: any) => {
            const appointment = await prisma.appointment.create({
                data: input,
            });
            // Send email notifications here
            return appointment;
        },
    },
};

export default resolvers;
