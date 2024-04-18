'use client'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {

  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  if (sessionStatus !== "authenticated") {
    router.replace("/");
    return toast.error('You are not logged in')
  }

  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    
    const verifyEmail = async () => {
      try {
        const res = await fetch("/api/check-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            //@ts-ignore
            email: session?.user?.email,
          })
        })

        if (res.status === 400) {
          setError("Email not verified")

        }
        if (res.status === 200) {
          setError("")
          setVerified(true)
        }
      }
      catch (error) {
        console.log(error)
      }
    }

    verifyEmail();
  }, [])

  return (
    <div className='flex items-center justify-center h-[90vh]'>
      {verified ? (<h1>Dashboard</h1>) : (<>Please verify your email from profile section to continue</>) }
    </div>
  )
}

export default Dashboard