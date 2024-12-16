'use client'

import React, {useOptimistic, useState} from 'react'
import {switchBlock, switchFollow} from '@/lib'

type UserInfoCardInteractionProps = {
    targetUserId: string,
    isUserBlocked: boolean,
    isFollowing: boolean,
    isFollowingRequestSent: boolean
}

function UserInfoCardInteraction(props: UserInfoCardInteractionProps) {
    const {targetUserId, currentUserId, isUserBlocked, isFollowing, isFollowingRequestSent} = props

    const [userState, setUserState] = useState({
        followingRequestSent: isFollowingRequestSent,
        following: isFollowing,
        blocked: isUserBlocked,
    })

    const follow = async () => {
        switchOptimisticState('follow')
        try {
            await switchFollow(targetUserId)
            setUserState((prevState) => ({
                ...prevState,
                following: prevState.following && false,
                followingRequestSent: !prevState.following && !prevState.followingRequestSent
            }))
        } catch (e) {

        }
    }

    const block = async () => {
        switchOptimisticState('block')
        try {
            await switchBlock(targetUserId)
            setUserState((prevState) => ({
                ...prevState,
                blocked: !prevState.blocked,
            }))
        } catch (e) {

        }
    }

    const [optimisticState, switchOptimisticState] = useOptimistic(userState, (state, action: 'block' | 'follow') => {
        switch (action) {
            case 'follow':
                return {
                    ...state,
                    following: state.following && false,
                    followingRequestSent: !state.following && !state.followingRequestSent
                }
            case 'block':
                return {
                    ...state,
                    blocked: !state.blocked,
                }
        }
    })

    return (
        <div className={'flex flex-col gap-4'}>
            <form action={follow}>
                <button className={'w-full bg-blue-500 text-white rounded-md text-sm p-2'}>
                    {
                        optimisticState.following ?
                            'Following'
                            : optimisticState.followingRequestSent
                                ? 'Friend Request Sent'
                                : 'Follow'
                    }
                </button>
            </form>

            <form action={block} className={'self-end'}>
                <button>
                    <span className={'text-red-400 text-xs cursor-pointer'}>
                        {
                            optimisticState.blocked ? 'Unblock User' : 'Block User'
                        }
                    </span>
                </button>
            </form>
        </div>
    )
}

export default UserInfoCardInteraction