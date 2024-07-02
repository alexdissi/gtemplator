import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      id: string;
      username: string | null;
      plan: string;
    } & DefaultSession["user"];
  }

  // eslint-disable-next-line no-unused-vars
  interface User {
    id: string;
    username?: string | null;
  }
}
