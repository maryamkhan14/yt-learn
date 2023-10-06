"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";
const INACTIVE_ROUTE =
  "py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700";
function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
        {session?.user?.name}
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default function NavMenu() {
  return (
    <div className="bg-slate-100 flex  w-full justify-end">
      <AuthButton />
    </div>
  );
}
