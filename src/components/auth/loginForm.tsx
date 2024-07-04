"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginUserInput, loginUserSchema } from "@/validator/registration";
import { LoadingButton } from "@/components/ui/buttons";
import {Label} from "@/components/ui/label";

export const LoginForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    try {
      setSubmitting(true);

      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      setSubmitting(false);

      if (response?.error) {
        reset({ password: "" });
        toast.error("Échec de la connexion");
      } else {
        toast.success("Connexion réussie");
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error("Échec de la connexion");
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <>
        <h1 className="text-3xl font-bold">Connexion</h1>
        <h2 className="text-balance text-muted-foreground">
          Connectez-vous à votre compte
        </h2>
        <form
            className="flex flex-col gap-3 w-5/6  md:w-4/6 xl:w-3/6"
            onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div>
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
                type="email"
                {...register("email")}
                placeholder="Adresse e-mail"
                className={`border-2 ${errors.email ? "border-red-400" : ""}`}
            />
            {errors.email && (
                <span className="text-red-500 text-xs pt-1 block">
              {errors.email?.message}
            </span>
            )}
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
                type="password"
                {...register("password")}
                placeholder="Mot de passe"
                className={`border-2 ${errors.password ? "border-red-400" : ""}`}
            />
            {errors.password && (
                <span className="text-red-500 text-xs pt-1 block">
              {errors.password?.message}
            </span>
            )}
          </div>
          {submitting ? <LoadingButton /> : <Button>Se connecter</Button>}
        </form>
        <p className="text-center">
          Vous n&apos;avez pas de compte ?
          <Link className="underline " href={"/auth/register"}>
            S&apos;inscrire
          </Link>
        </p>
      </>
  );
};