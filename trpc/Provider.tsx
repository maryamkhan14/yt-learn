"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { httpBatchLink, loggerLink, TRPCClientError } from "@trpc/client";
import { getBaseUrl } from "@/lib/api";
import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@/server";
import toast from "react-hot-toast";
import { TRPCError, type DefaultErrorShape } from "@trpc/server";
export const trpc = createTRPCReact<AppRouter>({});
function handleTRPCError(error: unknown) {
  if (error instanceof TRPCClientError || error instanceof TRPCError) {
    toast.error("An unknown error occurred!");
    if (error.message) {
      const message: DefaultErrorShape[] = JSON.parse(
        error.message,
      ) as DefaultErrorShape[];
      for (const error of message) {
        toast.error(`An error occurred: ${error.message}`);
      }
    }
  }
}
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
          mutations: {
            onError: (error) => handleTRPCError(error),
          },
          queries: {
            onError: (error) => handleTRPCError(error),
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
