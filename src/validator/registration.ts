/* eslint-disable camelcase */
import {TypeOf, object, string} from "zod"

const passwordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const createUserSchema = object({
    firstName: string({ required_error: "Le prénom est requis" })
        .min(1, "Le prénom est requis")
        .max(32, "Le prénom ne doit pas dépasser 32 caractères"),
    lastName: string({ required_error: "Le nom est requis" })
        .min(1, "Le nom est requis")
        .max(32, "Le nom ne doit pas dépasser 32 caractères"),
    email: string({ required_error: "L'adresse e-mail est requise" })
        .min(1, "L'adresse e-mail est requise")
        .email("L'adresse e-mail n'est pas valide"),
    password: string({ required_error: "Le mot de passe est requis" })
        .min(1, "Le mot de passe est requis")
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(32, "Le mot de passe ne doit pas dépasser 32 caractères")
        .regex(passwordValidation, "Le mot de passe ne respecte pas les critères de sécurité"),
    passwordConfirm: string({ required_error: "La confirmation du mot de passe est requise" })
        .min(1, "La confirmation du mot de passe est requise"),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Les mots de passe ne correspondent pas",
});

export const loginUserSchema = object({
    email: string({ required_error: "L'adresse e-mail est requise" })
        .min(1, "L'adresse e-mail est requise")
        .email("L'adresse e-mail n'est pas valide"),
    password: string({ required_error: "Le mot de passe est requis" }).min(
        1,
        "Le mot de passe est requis"
    ),
})

export const passwordForgotSchema = object({
    email: string({ required_error: "L'adresse e-mail est requise" })
        .min(1, "L'adresse e-mail est requise")
        .email("L'adresse e-mail n'est pas valide"),
})

export const passwordResetSchema = object({
    password: string({ required_error: "Le mot de passe est requis" })
        .min(1, "Le mot de passe est requis")
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(32, "Le mot de passe ne doit pas dépasser 32 caractères")
        .regex(passwordValidation, "Le mot de passe ne respecte pas les critères de sécurité"),
    confirmPassword: string({ required_error: "La confirmation du mot de passe est requise" })
        .min(1, "La confirmation du mot de passe est requise")
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(32, "Le mot de passe ne doit pas dépasser 32 caractères")
        .regex(passwordValidation, "Le mot de passe ne respecte pas les critères de sécurité"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
});

export type CreateUserInput = TypeOf<typeof createUserSchema>
export type LoginUserInput = TypeOf<typeof loginUserSchema>
export type PasswordForgotInput = TypeOf<typeof passwordForgotSchema>
export type PasswordResetInput = TypeOf<typeof passwordResetSchema>