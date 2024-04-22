"use client";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "../../../../utils/cn"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from 'sonner';
import Link from "next/link";
import axios from "axios";
export default function Resetpassword({ params }: any) {

    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    const [error, setError] = useState("");
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState();
    const [password, setPassword] = useState("");

    useEffect(() => {
        const verifyToken = async () => {

            try {
                const res = await fetch("/api/verify-emailToken", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token: params.token,
                    })
                })
          
                if (res.status === 400) {
                    setError("Token expired or invalid")
                    setVerified(true)

                }
                if (res.status === 200) {
                    setError("")
                    setVerified(true)
                    const userData = await res.json();
                    setUser(userData);
                }
            }
            catch (error) {
                console.log(error)
            }
        }

        verifyToken();
    }, [params.token])



    const verifyToken = async () => {
        try {
            const res = await fetch("/api/verify-userEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    //@ts-ignore
                    email: user?.email,
                })
            })
            if (res.status === 400) {
                return toast.error("Uh! Oh Something went wrong")
            }
            if (res.status === 200) {
                router.push("/userprofile")
            }
        }
        catch (error) {
            console.log(error)
        }

    }




    return (

        <div className="flex items-center justify-center h-[90vh]">


            <div className=" max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    verify email
                </h2>

                <p className="text-red-700 mb-2">{error && error}</p>

                <button className="h-auto w-auto border border-green-400 disabled:cursor-not-allowed" 
                 disabled={error.length > 0}
                onClick={verifyToken}>Click to verify</button>
           
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
