import React from 'react'
import Image from 'next/image'
import {prisma} from '@/lib'
import {auth} from '@clerk/nextjs/server'
import {redirect} from 'next/navigation'
import StoryList from '@/app/components/StoryList'

async function Stories() {

    const {userId: currentUserId} = await auth()

    if (!currentUserId) {
        return redirect('sign-in')
    }


    const followingIds = (await prisma.follower.findMany({
        where: {
            followerId: currentUserId
        },
        select: {
            followingId: true
        }
    }))
        .map(v => v.followingId)
        .concat(currentUserId)

    const stories = await prisma.story.findMany({
        where: {
            expiresAt: {
                gt: new Date(),
            },
            OR: [
                {
                    user: {
                        followers: {
                            some: {
                                followerId: currentUserId
                            }
                        }
                    }
                },
                {
                    userId: currentUserId
                }
            ]
        },
        include: {
            user: true
        }
    })

    const user = await prisma.user.findFirst({
        where: {
            id: currentUserId
        }
    })

    if (!user) {
        return redirect('sign-in')
    }

    return (
        <div className={'p-4 bg-white rounded-lg shadow-md text-xs overflow-scroll scrollbar-hide'}>
            <div className={'flex gap-8 w-max'}>
                <StoryList stories={stories} user={user}/>
            </div>
        </div>
    )
}

export default Stories