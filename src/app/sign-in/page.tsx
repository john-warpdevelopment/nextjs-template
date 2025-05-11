"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function SignInPage() {
  const { isSignedIn, user } = useUser();

  if (isSignedIn) {
    console.log("user", user);

    redirect("/companies");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="mt-12 text-4xl font-bold">Please Sign In</h1>
    </div>
  );
}
