'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from 'sonner';
import { GlowingStarsBackgroundCard, GlowingStarsDescription, } from '@/components/ui/glowing-stars';
import '@radix-ui/themes/styles.css';
const UserProfilebase = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  //console.log(session)
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
          email: session.user?.email,
        }),
      })
      if (res.status === 400) {
        return toast.error("Uh! Oh Something went wrong")
      }
      if (res.status === 200) {
        return toast.success("Email sent")
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  return (



    <div className="flex py-20 items-center justify-center antialiased">
      <GlowingStarsBackgroundCard>

        <div className="flex justify-between items-end h-[12vh]">
          <GlowingStarsDescription>
            {sessionStatus === "loading" ? (<h1>Loading</h1>) :
              <>

                {verified ? (
                  <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </span>
                    <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                      <span className='text-xl'>
                        User Verified
                      </span>
                      <svg
                        fill="none"
                        height="16"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.75 8.75L14.25 12L10.75 15.25"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                  </button>) :

                  (
                    <>
                      <button className="bg-red-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                        <span className="absolute inset-0 overflow-hidden rounded-full">
                          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </span>
                        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                          <span className='text-xl'>
                            User Not Verified
                          </span>
                          <svg
                            fill="none"
                            height="16"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.75 8.75L14.25 12L10.75 15.25"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                      </button>


                      <button className="text-sm p-1 shadow-[0_0_0_3px_#000000_inset]  bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform "
                       onClick={handleClick}>
                      Click here to send verification link
                      </button>

                    </>
                  )}
              </>}
          </GlowingStarsDescription>
          <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
            <Icon />
          </div>
        </div>
      </GlowingStarsBackgroundCard>
    </div>




  )
}

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-4 w-4 text-white stroke-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  );
};


export default UserProfilebase