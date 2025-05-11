import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";

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
      <ClerkProvider>
        <body>
          <header className="bg-gray-800 text-white p-4 mb-10">
            <Navbar />
          </header>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
