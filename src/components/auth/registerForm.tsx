"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { CreateUserInput, createUserSchema } from "@/validator/registration";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { LoadingButton } from "@/components/ui/buttons";
import { useRouter } from "next/navigation";
import {Label} from "@/components/ui/label";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const onSubmit: SubmitHandler<CreateUserInput> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();

      if (!response.ok) {
        return toast.error(responseData);
      }

      toast.success(responseData);
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <h1 className="text-3xl font-bold">Inscription</h1>
        <h2 className="text-balance text-muted-foreground">Créez votre compte pour commencer</h2>
        <form
            className="flex flex-col gap-3 w-5/6  md:w-4/6 xl:w-3/6"
            onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label htmlFor="firstName">
              Prénom
            </Label>
            <Input
                type="text"
                {...register("firstName")}
                placeholder="Prénom"
                className={`border-2 ${errors.firstName ? "border-red-400" : ""}`}
            />
            {errors.firstName && (
                <span className="text-red-500 text-xs pt-1 block">
      {errors.firstName.message}
      </span>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">
              Nom
            </Label>
            <Input
                type="text"
                {...register("lastName")}
                placeholder="Nom"
                className={`border-2 ${errors.lastName ? "border-red-400" : ""}`}
            />
            {errors.lastName && (
                <span className="text-red-500 text-xs pt-1 block">
      {errors.lastName.message}
    </span>
            )}
          </div>
          <div>
            <Label htmlFor="email">
              Adresse e-mail
            </Label>
            <Input
                type="email"
                {...register("email")}
                placeholder="Adresse e-mail"
                className={`border-2 ${errors.email ? "border-red-400" : ""}`}
            />
            {errors.email && (
                <span className="text-red-500 text-xs pt-1 block">
      {errors.email.message}
    </span>
            )}
          </div>
          <div>
            <Label htmlFor="password">
              Mot de passe
            </Label>
            <Input
                type="password"
                {...register("password")}
                placeholder="Mot de passe"
                className={`border-2 ${errors.password ? "border-red-400" : ""}`}
            />
            {errors.password && (
                <span className="text-red-500 text-xs pt-1 block">
      {errors.password.message}
    </span>
            )}
          </div>
          <div>
            <Label htmlFor="passwordConfirm">
              Confirmer le mot de passe
            </Label>
            <Input
                type="password"
                {...register("passwordConfirm")}
                placeholder="Confirmer le mot de passe"
                className={`border-2 ${errors.passwordConfirm ? "border-red-400" : ""}`}
            />
            {errors.passwordConfirm && (
                <span className="text-red-500 text-xs pt-1 block">
      {errors.passwordConfirm.message}
    </span>
            )}
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox id="terms1" required={true}/>
            <div className="grid gap-1.5 leading-none">
              <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                J&apos;accepte les conditions générales
              </label>
            </div>
          </div>
          {loading ? (
              <LoadingButton/>
          ) : (
              <Button type="submit">Inscription</Button>
          )}
          <Separator/>
          <p className="text-center">
            Vous avez déjà un compte ?{" "}
            <Link className="underline " href={"/auth/login"}>
              Connexion
            </Link>
          </p>
        </form>
      </>
  );
}