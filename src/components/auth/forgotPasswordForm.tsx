"use client"
import {useState} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {toast } from "sonner"
import {useRouter} from "next/navigation"
import {useLocale, useTranslations} from "next-intl"
import {PasswordForgotInput, passwordForgotSchema} from "@/validator/registration";
import {LoadingButton} from "@/components/ui/buttons";
import {Label} from "@/components/ui/label";

export default function ForgotPasswordForm() {
    const router = useRouter()
    const t = useTranslations("ForgotPassword")
    const [loading, setLoading] = useState(false)
    const local = useLocale()
    const redirect: string = local === "en" ? "/en/auth/login" : "/fr/auth/login";
    const methods = useForm<PasswordForgotInput>({
        resolver: zodResolver(passwordForgotSchema),
    })
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = methods
    const onSubmit: SubmitHandler<PasswordForgotInput> = async (data) => {
        try {
            setLoading(true)
            const response = await fetch("/api/auth/forgot-password/reset", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const responseData = await response.json()

            if (!response.ok) {
                return toast.error(t(responseData));
            }

            toast.success(t(responseData))
            router.push(redirect)
        } catch (error: string | any) {
            toast.error(t(error.message))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold">{t("title")}</h1>
            <h2 className="text-balance text-muted-foreground">{t("subtitle")}</h2>
            <form className='flex flex-col gap-3 w-[24rem]' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label htmlFor="email" className="text-muted-foreground">{t("placeholderEmail")}</Label>
                    <Input type="email" {...register("email")} placeholder={t("placeholderEmail")}  className={`border-2 ${errors.email ? "border-red-500" : ""}`}/>
                    {errors.email && (
                        <span className="text-red-500 text-xs pt-1 block">
              {t(`${errors.email?.message as string}`)}
          </span>
                    )}
                </div>
                {loading ? (
                    <LoadingButton/>
                ) : (
                    <Button type='submit'>
                        {t("button")}
                    </Button>
                )}
            </form>
        </>
    )
}
