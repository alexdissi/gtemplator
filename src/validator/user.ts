/* eslint-disable camelcase */
import { object, string, TypeOf } from "zod";

const passwordValidation =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const updatePasswordSchema = object({
    password: string({ required_error: "Mot de passe requis" })
        .min(1, "Mot de passe requis")
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(32, "Le mot de passe ne doit pas dépasser 32 caractères")
        .regex(passwordValidation, "Le mot de passe ne respecte pas les critères de sécurité"),
});

export const updateInfoSchema = object({
    username: string({ required_error: "Nom d'utilisateur requis" })
        .min(1, "Le nom d'utilisateur doit contenir au moins 1 caractère")
        .max(32, "Le nom d'utilisateur ne doit pas dépasser 32 caractères"),
});

export type UpdatePasswordInput = TypeOf<typeof updatePasswordSchema>;
export type UpdateInfoInput = TypeOf<typeof updateInfoSchema>;