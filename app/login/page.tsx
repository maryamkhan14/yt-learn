import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Login from "./components/Login";
async function SignInPage() {
  const session = await getServerSession();
  // if the user is not logged in, show the login page, otherwise redirect to the account page
  if (!session) {
    return <Login />;
  } else {
    redirect("/");
  }
}

export default SignInPage;
