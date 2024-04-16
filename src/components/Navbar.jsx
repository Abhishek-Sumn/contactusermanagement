"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignout = () => {
    signOut();
  };

  return (
    <div className="p-4 navgrad">
      <ul className="flex justify-between">
        <div>
          <Link href="/">Home</Link>
        </div>

        <div className="flex gap-4">
          <Link href="/dashboard">Dashboard</Link>
          {!session ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Register</Link>
            </>
          ) : (
            <>
              {session.user?.email}
              <li>
                <button onClick={handleSignout}>Logout</button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
