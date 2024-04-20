'use client'
import React, { useEffect, useState } from 'react'
import { signIn, useSession } from "next-auth/react";
import Adminerror from "../../components/Adminerror"
import axios from 'axios';

const Admin = () => {
    const { data: session, status: sessionStatus } = useSession();
    //console.log(session)

    const [tenant, setTenant] = useState([]);

    useEffect(() => {
        const getTenant = async () => {
            const res = await axios.get("/api/tenant/gettenant");
            const resData = await res.data
            //console.log(resData)
            setTenant(res.data.result);
        }
        getTenant()

    }, [])


    return (
        <div className=' flex items-center justify-center h-screen'>

            {session?.user?.role === "admin" ? (
                <div>
                    <h1>Admin</h1>
                    <span>{tenant?.map((element)=>(
                        <h1>{element.name}</h1>
                    ))}</span>
                </div>



            ) :

                (
                    <Adminerror />
                )}

        </div>
    )
}

export default Admin