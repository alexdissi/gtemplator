"use client"
import React, {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Input} from "@/components/ui/input"
import {toast} from "sonner"
import {zodResolver} from "@hookform/resolvers/zod"
import {SubmitHandler, useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {useLocale, useTranslations} from "next-intl"
import {passwordResetSchema, PasswordResetInput} from "@/validator/registration"
import {LoadingButton} from "@/components/ui/buttons";
import {Label} from "@/components/ui/label";

export default function ResetPasswordForm({token}: { token: string}) {
    const local = useLocale()
    const redirectLogin: string = local === "en" ? "/en/auth/login" : "/fr/auth/login"
    const redirectForgot: string = local === "en" ? "/en/auth/forgot-password" : "/fr/auth/forgot-password"
    const t = useTranslations("ResetPassword")
    const [user, setUser] = useState({
        email: "",
    })
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const methods = useForm<PasswordResetInput>({
        resolver: zodResolver(passwordResetSchema),
    })

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await fetch(`/api/auth/forgot-password/verify-token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token,
                    }),
                })

                if (res.status === 200) {
                    setUser({
                        email: (await res.json()).email
                    })
                }
            } catch (error: any) {
                toast.error(error?.response?.data)
                router.push(redirectForgot)
            }
        }

        verifyToken()
    }, [router, token])


    const {
        handleSubmit,
        register,
        formState: { errors },
    } = methods
    const onSubmit: SubmitHandler<PasswordResetInput> = async (data) => {
        try {
            setLoading(true)
            const response= await fetch(`/api/auth/forgot-password/update/${token}`, {
                method: "POST",
                body: JSON.stringify(data),
            })
            const responseData = await response.json()
            setLoading(false)

            if (!response.ok) {
                throw new Error(responseData.message)
            }

            toast.success(t(responseData))
           router.push(redirectLogin)
        } catch (error: string | any) {
            toast.error(t(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
                    <h1 className="text-3xl font-bold">
                        {t("title")}
                    </h1>
                    <form className='flex flex-col gap-3 w-5/6  md:w-4/6 xl:w-3/6' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label htmlFor={"password"}>{t("placeholderPassword")}</Label>
                            <Input type="password" {...register("password")} placeholder={t("placeholderPassword")}  className={`border-2 ${errors.password ? "border-red-400" : ""}`}/>
                            {errors.password && (
                                <span className="text-red-500 text-xs pt-1 block">
                                {t(`${errors.password?.message as string}`)}
                            </span>
                            )}
                        </div>
                        <div>
                            <Label htmlFor={"confirmPassword"}>{t("placeholderConfirmPassword")}</Label>
                            <Input type="password" {...register("confirmPassword")} placeholder={t("placeholderConfirmPassword")}  className={`border-2 ${errors.confirmPassword ? "border-red-400" : ""}`}/>
                            {errors.confirmPassword && (
                                <span className="text-red-500 text-xs pt-1 block">
                                {t(`${errors.confirmPassword?.message as string}`)}
                            </span>
                            )}
                        </div>
                        {loading ? (
                            <LoadingButton />
                        ) : (
                            <Button type="submit">{t("button")}</Button>)
                        }
                    </form>
        </>
    )
}
