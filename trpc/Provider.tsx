"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { getBaseUrl } from "@/lib/api";
import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@/server";
export const trpc = createTRPCReact<AppRouter>({});

export default function Provider({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            cacheTime: 1000 * 60 * 30, // 30 minutes
          },
        },
      }),
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            return {
              cookie: cookies,
              "x-trpc-source": "react",
            };
          },
        }),
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}
