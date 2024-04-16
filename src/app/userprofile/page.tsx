'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from 'sonner';

const UserProfilebase = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  //will run this if two times while rendering and then in useEffect to stop flicker effect
  /* if (sessionStatus !== "authenticated") {
    router.push("/login");
  } */

  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      router.replace("/login");
    }
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

    verifyEmail();
  }, [])

  const handleClick = async () => {
    try {
 
      const res = await fetch("/api/send-emailToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
         //@ts-ignore
          email:session.user?.email,
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
    sessionStatus === "loading" ? (<h1>Loading</h1>) :
      <>
        <div>UserProfilebase</div>
        {verified ? (<h1>User Verified</h1>) :
          (
            <>
              <h1>User Not Verified</h1>
              <button className='h-auto w-auto border border-green-600'
                onClick={handleClick}
              >
                Click here to send verification link</button>
            </>
          )}
      </>
  )
}

export default UserProfilebase