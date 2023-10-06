import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
