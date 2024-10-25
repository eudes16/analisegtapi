import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default {
    async getUsers() {
        const users = await prisma.user.findMany();
        return users;
    }
};
