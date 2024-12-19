'use client'

import {Story, User} from '@prisma/client'
import Image from 'next/image'
import React, {useOptimistic, useState} from 'react'
import {CldUploadWidget} from 'next-cloudinary'
import {addStory} from '@/lib'


type StoryWithUser = Story & { user: User }

type StoryListProps = {
    stories: StoryWithUser[],
    user: User
}

function StoryList(props: StoryListProps) {
    const {stories, user} = props
    const [storyList, setStoryList] = useState(stories)
    const [img, setImg] = useState<any>()

    const [optimisticStories, addOptimisticStory] = useOptimistic(
        storyList,
        (state, value: StoryWithUser) => [value, ...state]
    )

    const add = async () => {
        if (!img.secure_url) return
        addOptimisticStory({
            user: user,
            img: img.secure_url,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            createAt: new Date(Date.now()),
            id: Math.random() * 100,
            userId: user.id
        })

        try {
            const createdStory = await addStory(img?.secure_url)
            setStoryList((prevState) => {
                return [createdStory!, ...prevState]
            })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <CldUploadWidget uploadPreset="wty-preset" onSuccess={(results, widget) => {
                setImg(results.info)
                widget.close()
            }}>
                {({open}) => {
                    return (
                        <div className={'flex flex-col gap-2 cursor-pointer items-center relative'}
                             onClick={() => open()}>
                            <Image width={80} height={80} className={'w-20 h-20 rounded-full ring-2 object-cover'}
                                   src={img?.secure_url || user?.avatar || '/noAvatar.png'}
                                   alt=""
                            />
                            {
                                img
                                ? <form action={add}>
                                    <button className={'text-xs bg-blue-500 p-1 rounded-md text-white'}>Send</button>
                                </form>
                                : <span className={'font-medium'}>Add A Story</span>
                            }
                            <div className={'absolute text-6xl text-gray-200 top-3'}><span>+</span></div>
                        </div>
                    )
                }}
            </CldUploadWidget>
            {
                optimisticStories.map((story) => (
                    <div className={'flex flex-col gap-2 cursor-pointer items-center'} key={story.id}>
                        <Image width={80} height={80} className={'w-20 h-20 rounded-full ring-2'}
                               src={story.img || '/noAvatar.png'}
                               alt=""
                        />
                        <span className={'font-medium'}>{story.user.name || story.user.username}</span>
                    </div>
                ))
            }
        </>
    )
}

export default StoryList