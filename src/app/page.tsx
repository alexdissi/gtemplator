import Image from "next/image";
import {Button} from "@/components/ui/button";
import ToggleTheme from "@/components/ui/toggleTheme";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={"/auth/login"}>Se connecter</Link>
      <Link href={"/auth/register"}>Inscription</Link>
    </main>
  );
}
