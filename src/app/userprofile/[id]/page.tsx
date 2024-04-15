import React from 'react'

const UserProfile = ({ params }: any) => {
    return (
        <div className='flex items-center justify-center flex-col h-[90vh]'>
            <h1>UserProfile</h1>
            <p>{params.id}</p>
        </div>
    )
}

export default UserProfile