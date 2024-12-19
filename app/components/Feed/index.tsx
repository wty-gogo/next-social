import React from 'react'
import Post from '@/app/components/Feed/Post'
import {auth} from '@clerk/nextjs/server'
import {prisma} from '@/lib'
import {redirect} from 'next/navigation'

type FeedProps = {
    username?: string
}

async function Feed(props: FeedProps) {
    const {username} = props
    const {userId: currentUserId} = await auth()

    if (!currentUserId) {
        return redirect('/sign-in')
    }

    const findPosts = async (isProfile: boolean) => {
        if (isProfile) {
            return prisma.post.findMany({
                where: {
                    user: {
                        username
                    }
                },
                include: {
                    user: true,
                    likes: {
                        select: {
                            userId: true
                        }
                    },
                    _count: {
                        select: {
                            comments: true
                        }
                    }
                },
                orderBy: {
                    createAt: 'desc'
                }
            })
        } else {

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

            return prisma.post.findMany({
                where: {
                    userId: {
                        in: followingIds
                    }
                },
                include: {
                    user: true,
                    likes: {
                        select: {
                            userId: true
                        }
                    },
                    _count: {
                        select: {
                            comments: true
                        }
                    }
                },
                orderBy: {
                    createAt: 'desc'
                }
            })
        }
    }


    const posts = await findPosts(!!username)

    return (
        <div className={'p-4 bg-white shadow-md rounded-lg flex flex-col gap-12'}>
            {
                posts?.length
                ? posts.map(post => (<Post post={post} key={post.id}/>))
                : 'No posts found.'
            }
        </div>
    )
}

export default Feed