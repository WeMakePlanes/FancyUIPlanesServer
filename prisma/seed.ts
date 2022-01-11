import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { users } from "./user-seeds";

const prisma = new PrismaClient();

const seed = async (): Promise<void> => {
    await prisma.user.deleteMany({});

    for (const user of users) {
        await prisma.user.create({
            data: {
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                password: await bcrypt.hashSync(user.password, 10),
                email: user.email,
                bio: user.bio
            }
        });
    }
};

seed();