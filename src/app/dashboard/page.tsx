'use client'
import React from 'react'
import { toast } from 'sonner';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {

  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  if (sessionStatus != "authenticated") {
    router.replace("/");
    return toast.error('You are not logged in')
  }
  return (
    <div className='flex items-center justify-center h-[90vh]'>Dashboard</div>
  )
}

export default Dashboard