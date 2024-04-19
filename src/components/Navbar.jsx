"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Admin from "@/app/Admin/page";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignout = () => {
    signOut();
    router.refresh();
    router.replace("/");
  };

  return (
    <>
      {/*    <div className="p-2 navgrad ">
        <ul className="flex justify-between">
          <div>
            <Link href="/">Home</Link>
          </div>

          <div className="flex gap-4">
            {!session ? (
              <>
                <Link href="/login">Login</Link>

                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white "
                >
                  <Link href="/signup">Register</Link>
                </HoverBorderGradient>
              </>
            ) : (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/userprofile">{session.user?.email}</Link>
                <li>
                  <button onClick={handleSignout}>Logout</button>
                </li>
              </>
            )}
          </div>
        </ul>
      </div> */}
      <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
        <Link href="/">
          <aside className="flex items-center gap-2">
            <p className="text-3xl font-bold hidden lg:block ">CW</p>
            <Image
              src="/fuzzieLogo.png"
              width={15}
              height={15}
              alt="Logo"
              className="shadow-sm"
            />
          </aside>
        </Link>

        <aside className="flex items-center gap-4">
          {!session ? (
            <>
              <Link href="/login">Login</Link>

              <Link
                href="/signup"
                className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Register
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/Admin">Admin</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/userprofile">
                {session.user?.name || session.user?.email}
              </Link>
              <li>
                <button onClick={handleSignout}>Logout</button>
              </li>
            </>
          )}

          <MenuIcon className="md:hidden" />
        </aside>
      </header>
    </>
  );
};

export default Navbar;
