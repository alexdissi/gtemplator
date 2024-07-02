import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();

declare global {
    // eslint-disable-next-line no-unused-vars,init-declarations,no-var
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}
// eslint-disable-next-line no-undef
const prisma = globalThis.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-undef
    globalThis.prisma = prisma;
}
