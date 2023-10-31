import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server";
import { db } from "@/lib/db";
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({ db }),
  });

export { handler as GET, handler as POST };
