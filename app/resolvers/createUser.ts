import { Ctx, Field, Resolver, Mutation, InputType, Arg } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { User } from "@generated/type-graphql";

interface Context {
    prisma: PrismaClient
}

@InputType()
class AddUserInput implements Partial<User> {
    @Field({ nullable: false })
    first_name: string;

    @Field({ nullable: true })
    middle_name?: string;

    @Field({ nullable: false })
    last_name: string;

    @Field({ nullable: false })
    password: string;

    @Field({ nullable: true })
    bio?: string;

    @Field({ nullable: false })
    email: string

    // helpers - hash password
    get hashPassword(): string {
        return bcrypt.hashSync(this.password, 10);
    }
}

@Resolver()
export class CreateNewUserResolver {
    @Mutation(() => User || null)
    async createNewUser(@Ctx() { prisma }: Context, @Arg("data") { first_name, middle_name, last_name, hashPassword, bio, email }: AddUserInput): Promise<User | null> {
        return prisma.user.create({
            data: {
                first_name,
                middle_name,
                last_name,
                password: hashPassword,
                bio,
                email
            }
        });
    }
}

