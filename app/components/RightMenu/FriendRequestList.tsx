'use client'
import React, {useOptimistic, useState} from 'react'
import {FollowRequest, User} from '@prisma/client'
import Image from 'next/image'
import {acceptFollowRequest, declineFollowRequest} from '@/lib'

type RequestWithSender = FollowRequest & {
    sender: User
}

type FriendRequestListProps = {
    requests: RequestWithSender[]
}

function FriendRequestList(props: FriendRequestListProps) {
    const {requests} = props

    const [requestState, setRequestState] = useState(requests)

    const [optimisticRequests, removeOptimisticRequest] = useOptimistic(requestState, (state, id: number) => {
        return state.filter(v => v.id !== id)
    })

    const accept = async (requestId: number, userId: string) => {
        removeOptimisticRequest(requestId)

        try {
            await acceptFollowRequest(userId)
            setRequestState((prevState) => {
                return prevState.filter(v => v.id !== requestId)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const decline = async (requestId: number, userId: string) => {
        removeOptimisticRequest(requestId)

        try {
            await declineFollowRequest(userId)
            setRequestState((prevState) => {
                return prevState.filter(v => v.id !== requestId)
            })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            {
                optimisticRequests.map((request) => (
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
                            <form action={() => accept(request.id, request.sender.id)}>
                                <button>
                                    <Image src={'/accept.png'} alt={'accept'} width={16} height={16}
                                           className={'cursor-pointer'}/>
                                </button>
                            </form>
                            <form action={() => decline(request.id, request.sender.id)}>
                                <button>
                                    <Image src={'/reject.png'} alt={'accept'} width={16} height={16}
                                           className={'cursor-pointer'}/>
                                </button>
                            </form>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default FriendRequestList