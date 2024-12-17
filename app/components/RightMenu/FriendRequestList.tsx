'use client'
import React from 'react'
import {FollowRequest, User} from '@prisma/client'
import Image from 'next/image'

type RequestWithSender = FollowRequest & {
    sender: User
}

type FriendRequestListProps = {
    requests: RequestWithSender[]
}

function FriendRequestList(props: FriendRequestListProps) {
    const {requests} = props
    return (
        <>
            {
                requests.map((request) => (
                    <div className={'flex items-center justify-between '} key={request.id}>
                        <div className={'flex items-center gap-4'}>
                            <Image
                                src={request.sender.avatar || '/noAvatar.png'}
                                alt={''} width={40} height={40} className={'w-10 h-10 rounded-full object-cover'}/>
                            <span className={'font-bold'}>
                                {
                                    request.sender.name && request.sender.surname
                                        ? request.sender.name + ' ' + request.sender.surname
                                        : request.sender.username
                                }
                            </span>
                        </div>
                        <div className={'flex gap-3'}>
                            <Image src={'/accept.png'} alt={'accept'} width={16} height={16}
                                   className={'cursor-pointer'}/>
                            <Image src={'/reject.png'} alt={'accept'} width={16} height={16}
                                   className={'cursor-pointer'}/>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default FriendRequestList