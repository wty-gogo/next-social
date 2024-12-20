'use client'

import {useState} from 'react'
import Image from 'next/image'
import {deletePost} from '@/lib'

type PostInfoProps = {
    postId: number
}

function PostInfo(props: PostInfoProps) {
    const {postId} = props
    const [open, setOpen] = useState(false)
    const deletePostWithId = () => deletePost(postId)
    return (
        <div className={'relative'}>
            <Image src={'/more.png'} alt={'more'} width={16} height={16} className={'cursor-pointer'}
                   onClick={() => setOpen(prevState => !prevState)}/>
            {
                open && <div
                    className={'absolute top-4 right-0 bg-white p-4 w-32 rounded-lg flex flex-col gap-2 text-xs text-nowrap shadow-lg z-30'}>
                    <span>View</span>
                    <span>Re-post</span>
                    <form action={deletePostWithId}>
                        <button className={'text-red-500'}>Delete</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default PostInfo