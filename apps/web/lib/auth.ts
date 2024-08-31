import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { api } from "@repo/libs";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Name" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ name: z.string().min(2), password: z.string().min(4) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { name, password } = parsedCredentials.data;
          const { data, error } = await api.auth.login.post({ name, password });

          if (error) {
            return null;
          }

          if (!data.result) {
            return null;
          }

          return {
            id: data.result.user.id.toString(),
            name: data.result.user.name,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          token: token,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
        };
      }

      return token;
    },
  },
};

export default NextAuth(authOptions);
