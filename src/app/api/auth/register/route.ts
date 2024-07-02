import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {createUserSchema} from "@/validator/registration";
import {getUserByEmail} from "@/data/user";

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, password } = createUserSchema.parse(await req.json());
        const hashedPassword: string = await bcrypt.hash(password, 12);
        const name: string = `${firstName} ${lastName}`;
        const cleanEmail: string = email.toLowerCase();
        const defaultAvatar: string = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;

        if (!name || !email || !password) {
            return NextResponse.json("Champs manquant", { status: 400 });
        }

        const exist = await getUserByEmail(cleanEmail);

        if (exist) {
            return NextResponse.json("L'utilisateur existe deja", { status: 500 });
        }

        await prisma.user.create({
            data: {
                name,
                email: cleanEmail,
                password: hashedPassword,
                image: defaultAvatar,
            },
        });

        return NextResponse.json("Inscription reussie", { status: 200 });
    } catch (error) {
return NextResponse.json("Erreur lors de l'inscription", { status: 500 });
    }
}