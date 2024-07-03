"use client"

import {Loader2, LogOut} from "lucide-react";
import { signOut } from "next-auth/react";
import {Button} from "@/components/ui/button";

export const LoadingButton = () => (
        <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </Button>
    );

export const LogoutButton = () => (
            <LogOut onClick={() => signOut({ callbackUrl: "/", redirect:true })} className={"text-red-600 cursor-pointer"}/>
    );
