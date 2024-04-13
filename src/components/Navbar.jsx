import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='p-4 navgrad'>
        
        <ul className='flex justify-between'>
            <div>
                <Link href="/">
                    Home
                </Link>
            </div>

            <div className='flex gap-4'>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/login">Login</Link>
                <Link href="/signup">Register</Link>

            </div>
        </ul>

    </div>
  )
}

export default Navbar