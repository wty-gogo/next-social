'use server'

import {auth} from '@clerk/nextjs/server'
import prisma from '@/lib/client'

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
        throw e
    }
}