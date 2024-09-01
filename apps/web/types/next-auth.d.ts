import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    token: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
    token: string;
    expires: string;
  }
}
