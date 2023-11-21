import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});
/*matcher: ["/(api|trpc)(.*)"], */
export const config = {
  matcher: ["/dashboard"],
};
