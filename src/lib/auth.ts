import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {getUserByEmail} from "@/data/user";

export const { handlers, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await getUserByEmail(credentials.email as string);

                if (!user) {
                    throw new Error("User not found.")
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password as string,
                );

                if (!isPasswordValid) {
                    return null;
                }

                return user;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.username = user.username;
                token.image = user.image;
            }

            if (trigger === "update" && session) {
                token.username = session.username;
                token.image = session.image;
            }

            return token;
        },
        session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name;
                session.user.username = token.username as string;
                session.user.image = token.image as string;
            }

            return session;
        },
    },
});
