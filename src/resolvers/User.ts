import { User } from "@prisma/client";

export default {
    createdAt(user: User) {
        return user.createdAt.toISOString();
    },
    
    updatedAt(user: User) {
        return user?.updatedAt?.toISOString() ?? null;
    }
}