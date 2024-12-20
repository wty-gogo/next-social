'use server'

import {auth} from '@clerk/nextjs/server'
import prisma from '@/lib/client'
import {z} from 'zod'
import {revalidatePath} from 'next/cache'

export const switchFollow = async (userId: string) => {
    const {userId: currentUserId} = await auth()

    if (!currentUserId) {
        throw new Error('User is not authorized')
    }

    try {
        const existingFollow = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId,
                followingId: userId
            }
        })

        if (!!existingFollow) {
            await prisma.follower.delete({
                where: {
                    id: existingFollow.id
                }
            })
        } else {
            const existingFollowRequest = await prisma.followRequest.findFirst({
                where: {
                    senderId: currentUserId,
                    receiverId: userId
                }
            })
            if (existingFollowRequest) {
                await prisma.followRequest.delete({
                    where: {
                        id: existingFollowRequest.id
                    }
                })
            } else {
                await prisma.followRequest.create({
                    data: {
                        senderId: currentUserId,
                        receiverId: userId
                    }
                })
            }
        }

    } catch (e) {
        console.error(e)
        throw e
    }
    return 1
}

export const switchBlock = async (userId: string) => {
    const {userId: currentUserId} = await auth()
    if (!currentUserId) {
        throw new Error('User is not authorized')
    }
    try {
        const existingBlock = await prisma.block.findFirst({
            where: {
                blockedId: userId,
                blockerId: currentUserId
            }
        })
        if (!!existingBlock) {
            await prisma.block.delete({
                where: {
                    id: existingBlock.id
                }
            })
        } else {
            await prisma.block.create({
                data: {
                    blockedId: userId,
                    blockerId: currentUserId
                }
            })
        }
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const acceptFollowRequest = async (userId: string) => {
    const {userId: currentUserId} = await auth()
    if (!currentUserId) {
        throw new Error('User is not authorized')
    }
    try {
        const existingFollowingRequest = await prisma.followRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: currentUserId
            }
        })
        if (!!existingFollowingRequest) {
            await prisma.followRequest.delete({
                where: {
                    id: existingFollowingRequest.id
                }
            })
        }
        await prisma.follower.create({
            data: {
                followingId: currentUserId,
                followerId: userId
            }
        })
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const declineFollowRequest = async (userId: string) => {
    const {userId: currentUserId} = await auth()
    if (!currentUserId) {
        throw new Error('User is not authorized')
    }
    try {
        const existingFollowingRequest = await prisma.followRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: currentUserId
            }
        })
        if (!!existingFollowingRequest) {
            await prisma.followRequest.delete({
                where: {
                    id: existingFollowingRequest.id
                }
            })
        }
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const updateProfile = async (
    state: { success: boolean, error: boolean },
    payload: { formData: FormData, cover: string }
) => {

    const {formData, cover} = payload

    const fields = Object.fromEntries(formData)

    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => !!value)
    )

    const Profile = z.object({
        cover: z.string().optional(),
        name: z.string().max(60).optional(),
        surname: z.string().max(60).optional(),
        description: z.string().max(255).optional(),
        city: z.string().max(60).optional(),
        school: z.string().max(60).optional(),
        website: z.string().max(60).optional(),
        work: z.string().max(60).optional(),
    })

    const validatedFields = Profile.safeParse({...filteredFields, cover})

    if (!validatedFields.success) {
        const data = validatedFields.data
        console.error(validatedFields.error.flatten().fieldErrors)
        return {
            success: false,
            error: true
        }
    }

    if (!validatedFields.data) {
        return {
            success: false,
            error: true
        }
    }

    const {userId: currentUserId} = await auth()

    if (!currentUserId) {
        throw new Error('User is not authorized')
    }

    try {
        await prisma.user.update({
            where: {
                id: currentUserId
            },
            data: validatedFields.data
        })
        return {
            success: true,
            error: false
        }
    } catch (e) {
        console.log(e)
        return {
            success: false,
            error: true
        }
    }

}

export const switchLike = async (postId: number) => {
    const {userId: currentUserId} = await auth()
    if (!currentUserId) {
        throw new Error('User is not authorized')
    }
    try {
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: currentUserId,
                postId: postId
            }
        })
        if (!!existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            })
        } else {
            await prisma.like.create({
                data: {
                    userId: currentUserId,
                    postId: postId
                }
            })
        }
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const addComment = async (postId: number, desc: string) => {
    const {userId: currentUserId} = await auth()
    if (!currentUserId) {
        throw new Error('User is not authorized')
    }
    try {
        return await prisma.comment.create({
            data: {
                postId: postId,
                desc: desc,
                userId: currentUserId
            },
            include: {
                user: true
            },
        })
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const addPost = async (formData: FormData, img: string) => {
    const desc = formData.get('desc')

    const Desc = z.string().min(1).max(255)

    const validatedDesc = Desc.safeParse(desc)

    if (!validatedDesc.success) {
        return validatedDesc.error
    }

    const {userId: currentUserId} = await auth()

    if (!currentUserId) {
        throw new Error('User is not authorized')
    }

    try {
        await prisma.post.create({
            data: {
                desc: validatedDesc.data,
                userId: currentUserId,
                img: img
            }
        })
        revalidatePath('/')
    } catch (e) {

    }
}

export const addStory = async (img: string) => {

    const {userId: currentUserId} = await auth()

    if (!currentUserId) {
        throw new Error('User is not authorized')
    }

    try {
        const existingStory = await prisma.story.findFirst({
            where: {
                userId: currentUserId
            }
        })
        if (!!existingStory) {
            await prisma.story.delete({
                where: {
                    id: existingStory.id
                }
            })
        }
        return await prisma.story.create({
            data: {
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                img: img,
                userId: currentUserId
            },
            include: {
                user: true
            }
        })
    } catch (e) {

    }
}

export const deletePost = async (postId: number) => {
    const {userId: currentUserId} = await auth()
    if (!currentUserId) {
        throw new Error('User is not authorized')
    }
    try {
        await prisma.post.delete({
            where: {
                id: postId,
                userId: currentUserId
            }
        })
        revalidatePath('/')
    } catch (e) {
        throw e
    }

}