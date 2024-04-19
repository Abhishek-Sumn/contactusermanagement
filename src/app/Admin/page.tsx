'use client'
import React from 'react'
import { signIn, useSession } from "next-auth/react";

const Admin = () => {
    const { data: session, status: sessionStatus } = useSession();
    console.log(session)
    return (
        <div className='mt-[15vh]'>
            
            {session?.user?.role === "admin" ? (<h1>Admin</h1>) : (<h1>You are not Authorised</h1>)}
            
            </div>
    )
}

export default Admin