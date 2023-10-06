"use client";
import React from "react";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="flex h-2/3 w-full flex-col items-center justify-between rounded-lg bg-white/70 p-8 shadow backdrop-blur dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl ">
        Welcome back!
      </h1>
      <div className="flex justify-center space-y-4 md:space-y-6">
        <button
          type="button"
          className="mb-2 mr-2 inline-flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center font-medium  text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={() => signIn("google")}
        >
          <i className="ri-google-fill ri-xl flex items-center fill-cyan-700" />
          Log in with Google
        </button>
      </div>
      <p className="text-lg font-light text-gray-500 dark:text-gray-400">
        Don&rsquo;t have an account yet?{" "}
        <a
          href="#"
          className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}

export default Login;
