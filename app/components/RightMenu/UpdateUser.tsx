'use client'

import {User} from '@prisma/client'
import React, {useActionState, useState} from 'react'
import Image from 'next/image'
import {updateProfile} from '@/lib'
import {CldUploadWidget} from 'next-cloudinary'
import {useRouter} from 'next/navigation'
import UpdateButton from '@/app/components/RightMenu/UpdateButton'

type UpdateUserProps = {
    user: User
}

function UpdateUser(props: UpdateUserProps) {

    const {user} = props

    const [open, setOpen] = useState(false)
    const [coverRes, setCoverRes] = useState<any>('')

    const [state, formAction] = useActionState(updateProfile, {
        success: false,
        error: false
    })

    const handleClose = () => {
        setOpen(false)
        state.success && router.refresh()
    }

    const router = useRouter()


    return (
        <>
            <div className={'text-blue-500 text-xs cursor-pointer'} onClick={() => setOpen(true)}>Update</div>
            {
                open && <div
                    className={'absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50'}>
                    <form
                        action={(formData) => formAction({formData, cover: coverRes?.secure_url})}
                        className={'relative p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3'}
                    >
                        {/*Title*/}
                        <h1>Update Profile</h1>
                        <div className={'mt-4 text-xs text-gray-500'}>
                            Use the navbar profile to change the avatar and username
                        </div>

                        {/*Cover Picture*/}
                        <div className={'flex flex-col gap-4 my-4'}>
                            <label htmlFor="">Cover Picture</label>
                            <div className={'flex items-center gap-2 cursor-pointer'}>
                                <Image src={user.cover || 'noCover.png'} alt={'cover'} width={48} height={32}
                                       className={'w-12 h-8 rounded-md object-cover'}/>
                                <CldUploadWidget uploadPreset="wty-preset" onSuccess={(results, widget) => {
                                    console.log(results)
                                    setCoverRes(results.info)
                                }}>
                                    {({open}) => {
                                        return (
                                            <button onClick={() => open()}>
                                                <span className={'text-xs underline text-gray-600'}>Change</span>
                                            </button>
                                        )
                                    }}
                                </CldUploadWidget>

                            </div>
                        </div>

                        <div className={'flex flex-wrap justify-between gap-2 xl:gap-4'}>
                            <div className={'flex flex-col gap-4'}>
                                <label htmlFor="" className={'text-xs'}>First Name</label>
                                <input className={'ring-1 ring-gray-300 p-3 rounded-md text-sm'} type="text"
                                       placeholder={user.name || 'John'} name={'name'}/>
                            </div>
                            <div className={'flex flex-col gap-4'}>
                                <label htmlFor="" className={'text-xs'}>Last Name</label>
                                <input className={'ring-1 ring-gray-300 p-3 rounded-md text-sm'} type="text"
                                       placeholder={user.surname || 'Doe'} name={'surname'}/>
                            </div>
                            <div className={'flex flex-col gap-4'}>
                                <label htmlFor="" className={'text-xs'}>Description</label>
                                <input className={'ring-1 ring-gray-300 p-3 rounded-md text-sm'} type="text"
                                       placeholder={user.description || 'I\'m a good man...'} name={'description'}/>
                            </div>
                            <div className={'flex flex-col gap-4'}>
                                <label htmlFor="" className={'text-xs'}>City</label>
                                <input className={'ring-1 ring-gray-300 p-3 rounded-md text-sm'} type="text"
                                       placeholder={user.city || 'HangZhou'} name={'city'}/>
                            </div>
                            <div className={'flex flex-col gap-4'}>
                                <label htmlFor="" className={'text-xs'}>School</label>
                                <input className={'ring-1 ring-gray-300 p-3 rounded-md text-sm'} type="text"
                                       placeholder={user.school || 'ZUST'} name={'school'}/>
                            </div>
                            <div className={'flex flex-col gap-4'}>
                                <label htmlFor="" className={'text-xs'}>Work</label>
                                <input className={'ring-1 ring-gray-300 p-3 rounded-md text-sm'} type="text"
                                       placeholder={user.work || 'YuanSuan Tec Inc.'} name={'work'}/>
                            </div>
                            <div className={'flex flex-col gap-4'}>
                                <label htmlFor="" className={'text-xs'}>WebSite</label>
                                <input className={'ring-1 ring-gray-300 p-3 rounded-md text-sm'} type="text"
                                       placeholder={user.website || 'github.com'} name={'website'}/>
                            </div>
                        </div>
                        <UpdateButton/>
                        {
                            state.success && <span className={'text-green-500'}>Profile has been uploaded!</span>
                        }
                        {
                            state.error && <span className={'text-red-500'}>Something wrong!</span>
                        }
                        <div onClick={handleClose} className={'absolute right-3 top-1 text-lg cursor-pointer'}>X</div>
                    </form>
                </div>
            }
        </>
    )
}

export default UpdateUser