import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default prisma;

export async function disconnectAsync() {
    await prisma.$disconnect();
};

prisma.$on('beforeExit', async () => {
    console.log("CDotLog: prisma before exit")
    await prisma.$disconnect();
});
