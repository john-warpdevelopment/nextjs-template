"use client";

import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <div className="container mx-auto flex justify-between items-center py-4">
      <Link href="/">
        <h1 className="text-2xl font-bold cursor-pointer">Example</h1>
      </Link>
      {isSignedIn ? (
        <SignOutButton>
          <Button variant="ghost">Sign Out</Button>
        </SignOutButton>
      ) : (
        <SignInButton>
          <Button variant="ghost">Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}
