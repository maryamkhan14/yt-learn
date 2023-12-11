/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth/next";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    };
  }
}
