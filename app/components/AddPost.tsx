'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import {useUser} from '@clerk/nextjs'
import {CldUploadWidget} from 'next-cloudinary'
import AddPostButton from '@/app/components/AddPostButton'
import {addPost} from '@/lib'

function AddPost() {

    const {user, isLoaded} = useUser()
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState<any>()

    if (!isLoaded) return 'Loading...'


    return (
        <div className={'p-4 bg-white rounded-lg flex gap-4 text-sm justify-between shadow-md'}>
            {/*Avatar*/}
            <Image
                src={user?.imageUrl || '/noAvatar.png'}
                alt={''} width={48} height={48} className={'w-12 h-12 object-cover rounded-full'}
            />
            {/*Post*/}
            <div className={'flex-1 p-2'}>
                {/*text input*/}
                <form action={async (formData) => {
                    await addPost(formData, img?.secure_url || '')
                }}
                      className={'flex gap-4'}
                >
                    <textarea name={'desc'} className={'flex-1'} placeholder={'What is on your mind?'}
                              onChange={(e) => setDesc(e.target.value)}/>
                    <div>
                        <Image src={'/emoji.png'} alt={'emoji'} className={'w-5 h-5 cursor-pointer self-end'} width={20}
                               height={20}/>
                        <AddPostButton/>
                    </div>
                </form>
                {/*post options*/}
                <div className={'flex mt-4 items-center gap-4 text-gray-400 flex-wrap'}>
                    <CldUploadWidget uploadPreset="wty-preset" onSuccess={(results, widget) => {
                        setImg(results.info)
                        widget.close()
                    }}>
                        {({open}) => {
                            return (
                                <div className={'flex items-center gap-2 cursor-pointer'} onClick={() => open()}>
                                    <Image src={'/addImage.png'} alt={'emoji'}
                                           className={'w-5 h-5 cursor-pointer self-end'}
                                           width={20}
                                           height={20}/>
                                    Photo
                                </div>
                            )
                        }}
                    </CldUploadWidget>

                    <div className={'flex items-center gap-2 cursor-pointer'}>
                        <Image src={'/addVideo.png'} alt={'emoji'} className={'w-5 h-5 cursor-pointer self-end'}
                               width={20}
                               height={20}/>
                        Video
                    </div>
                    <div className={'flex items-center gap-2 cursor-pointer'}>
                        <Image src={'/poll.png'} alt={'emoji'} className={'w-5 h-5 cursor-pointer self-end'} width={20}
                               height={20}/>
                        Poll
                    </div>
                    <div className={'flex items-center gap-2 cursor-pointer'}>
                        <Image src={'/addEvent.png'} alt={'emoji'} className={'w-5 h-5 cursor-pointer self-end'}
                               width={20}
                               height={20}/>
                        Event
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost