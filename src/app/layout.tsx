import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Company CRUD",
  description: "Example of a company CRUD application using Next.js and React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 text-white p-4 mb-10">
          <div className="container mx-auto">
            <Link href="/">
              <h1 className="text-2xl font-bold cursor-pointer">Example</h1>
            </Link>
          </div>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
