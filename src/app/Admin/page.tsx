'use client'
import React from 'react'
import { signIn, useSession } from "next-auth/react";

const Admin = () => {
    const { data: session, status: sessionStatus } = useSession();
    //console.log(session)
    return (
        <div className=' flex items-center justify-center h-screen'>
            
            {session?.user?.role === "admin" ? (<h1>Admin</h1>) : (

                <div className="text-center">
                <h1 className="mb-4 text-4xl font-semibold text-red-500">Not Authorised</h1>
                <p className="mb-4 text-lg text-gray-600">Oops! Looks like you're not <span className='text-2xl text-red-400'>Admin</span>.</p>
                <div className="animate-bounce">
                <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                </div>
                <p className="mt-4 text-gray-600">Let's get you back <a href="/" className="text-blue-500">home</a>.</p>
                </div>
            )}
            
        </div>
    )
}

export default Admin