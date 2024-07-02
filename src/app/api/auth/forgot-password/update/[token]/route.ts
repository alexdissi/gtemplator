import { NextResponse } from "next/server"
import {hash} from "bcryptjs"
import prisma from "@/lib/prisma";
import {getUserByToken} from "@/data/user";
import { passwordResetSchema} from "@/validator/registration";

export async function POST(req: Request, token: any) {
    const { password, confirmPassword } = passwordResetSchema.parse(await req.json());
    const { params: { token: passwordResetToken } } = token;

    if (password !== confirmPassword) {
        return new NextResponse("error.passwordMatch", { status: 400 });
    }

    const user = await getUserByToken(passwordResetToken);

    if (!user) {
        throw new Error("error.noAccountExists");
    }

    const hashedPassword = await hash(password, 12);

    try {
        await prisma.user.update({
            where: {
                passwordResetToken
            },
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetTokenExp: null,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json("success", { status: 200 });
    } catch (error) {
        return new NextResponse("error.error", { status: 500 });
    }
}