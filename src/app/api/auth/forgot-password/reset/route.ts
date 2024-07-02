import {NextResponse} from "next/server"
import cryptoRandomString from "crypto-random-string"
import {passwordForgotSchema} from "@/validator/registration"
import {sendMail} from "@/lib/mailer";
import prisma from "@/lib/prisma";
import {getUserByEmail} from "@/data/user";
import {ResetPassword} from "../../../../../../emails/resetPassword";

export async function POST(req: Request) {
    const { email } = passwordForgotSchema.parse(await req.json())
    const user = await getUserByEmail(email)

    if (!user) {
        return NextResponse.json("error.noAccountExists", {status: 400})
    }

    try {
        const encrypt = cryptoRandomString({length: 32, type: "alphanumeric"})
        const passwordResetTokenExp = new Date()
        passwordResetTokenExp.setMinutes(passwordResetTokenExp.getMinutes() + 10)

        await prisma.user.update({
            where: {
                email
            },
            data: {
                passwordResetToken: encrypt,
                passwordResetTokenExp,
            }
        })

        const name = user.name as string
        const link = `${process.env.APP_URL}/auth/reset-password/${encrypt}`
        await sendMail(email, "Password reset", ResetPassword({ name,link }))

        return NextResponse.json("success", { status: 200 });
    } catch (error) {
        return NextResponse.json("error.error", { status: 500 });
    }
}