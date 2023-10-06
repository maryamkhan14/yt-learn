import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Image from "next/image";
import Login from "./components/Login";
async function SignInPage() {
  const session = await getServerSession();
  // if the user is not logged in, show the login page, otherwise redirect to the account page
  if (!session) {
    return (
      <section className="relative flex grow ">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-full lg:py-0">
          <Login />
        </div>
      </section>
    );
  } else {
    redirect("/");
  }
}

export default SignInPage;
