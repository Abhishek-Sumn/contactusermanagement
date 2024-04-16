import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

//our imports
import Navbar from "../components/Navbar"
import { getServerSession } from "next-auth";
import AuthProvider from "../../utils/SessionProvider";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "ContactWise",
  description: "Developed By Abhishek Suman",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>

        <AuthProvider session={session}>
          <Navbar />
          {children}
          <Toaster position="top-center" richColors />
        </AuthProvider>

      </body>
    </html>
  );
}
