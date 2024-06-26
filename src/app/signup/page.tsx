"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "../../../utils/cn"
import { IconBrandGithub, IconBrandGoogle, } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn,useSession } from "next-auth/react";
import { toast } from 'sonner';
export default function SignupFormDemo() {

  const router = useRouter();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  })

  const { data: session, status: sessionStatus } = useSession();

  const onClickSignup = async () => {

    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
      if (response.data.success) {
        return toast.success("Account Successfully Created")
      }

    } catch (error: any) {
      if (error.response.status === 400) {
        return toast.error("Email already exist")
      }
      console.log(error)
    }

  }



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
  };
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/userprofile");
    }
  }, [sessionStatus, router]);

  return (

    <div className="flex items-center justify-center h-screen">
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to ContactWise
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Abhishek" type="text" value={user.firstname} required
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Suman" type="text" value={user.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })} />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@google.com" type="email" value={user.email} required
            onChange={(e) => setUser({ ...user, email: e.target.value })} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })} />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={(e: any) => onClickSignup()}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={() => { signIn("github") }}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
         {/*  <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            onClick={() => { signIn("google") }}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button> */}

        </div>
      </form>
    </div>
    </div>
  );
}



















const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
