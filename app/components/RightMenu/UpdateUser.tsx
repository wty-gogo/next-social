'use client'

import {User} from '@prisma/client'
import React, {useState} from 'react'
import Image from 'next/image'

type UpdateUserProps = {
    user: User
}

function UpdateUser(props: UpdateUserProps) {

    const {user} = props

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <div className={'text-blue-500 text-xs cursor-pointer'} onClick={() => setOpen(true)}>Update</div>
            {
                open && <div
                    className={'absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50'}>
                    <form
                        action=""
                        className={'relative p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3'}
                    >
                        <h1>Update Profile</h1>

                        <div className={'mt-4 text-xs text-gray-500'}>
                            Use the navbar profile to change the avatar and username
                        </div>

                        <div className={'flex flex-col gap-4 my-4'}>
                            <label htmlFor="">Cover Picture</label>
                            <div className={'flex items-center gap-2 cursor-pointer'}>
                                <Image src={user.cover || 'noCover.png'} alt={'cover'} width={48} height={32}
                                       className={'w-12 h-8 rounded-md object-cover'}/>
                                <span className={'text-xs underline text-gray-600'}>Change</span>
                            </div>
                        </div>

                        <div className={'flex flex-wrap justify-between gap-2 xl:gap-4'}>
                                <div className={'flex flex-col gap-4'}>
                                    <label htmlFor="" className={'text-xs'}>First Name</label>
                                </div>
                        </div>

                        <div onClick={handleClose} className={'absolute right-3 top-1 text-lg cursor-pointer'}>X</div>
                    </form>
                </div>
            }
        </>
    )
}

export default UpdateUser