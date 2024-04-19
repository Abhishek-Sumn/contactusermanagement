'use client'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Predashboard from "../../components/Predashboard";
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const Dashboard = () => {

  const [loading, setLoading] = useState(true);

  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "loading") {
      router.replace("/dashboard");
    }
    else if (sessionStatus != "authenticated") {
      router.replace("/");
    }
    setLoading(false)
  }, []);

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
    setLoading(false)
    verifyEmail();
  }, [sessionStatus])

  return (
    <div className='flex items-center justify-center h-[90vh]'>
      {loading ? (<>Loading</>) : (verified ? (<Predashboard />) : (<TextGenerateEffect words='If you are logged in please verify your email first' />))}


    </div>
  )
}



export default Dashboard