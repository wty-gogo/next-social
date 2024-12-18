'use client'

import Image from 'next/image'
import {useAuth} from '@clerk/nextjs'
import {useEffect, useOptimistic, useState} from 'react'
import {switchLike} from '@/lib'

type PostInteractionProps = {
    currentUserId: string
    postId: number
    likes: string[],
    commentCount: number
}

function PostInteraction(props: PostInteractionProps) {
    const {postId, likes, commentCount, currentUserId} = props

    const [likeState, setLikeState] = useState({
        likeCount: likes.length,
        isLiked: currentUserId
                 ? likes.includes(currentUserId)
                 : false
    })

    const [optimisticLike, switchOptimisticLike] = useOptimistic(likeState, (state) => {
        return {
            likeCount: state.isLiked
                       ? state.likeCount - 1
                       : state.likeCount + 1,
            isLiked: !state.isLiked
        }
    })

    const likeAction = async (postId: number) => {
        switchOptimisticLike('')
        try {
            await switchLike(postId)
            setLikeState((prevState) => {
                return {
                    likeCount: prevState.isLiked
                               ? prevState.likeCount - 1
                               : prevState.likeCount + 1,
                    isLiked: !prevState.isLiked
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={'flex items-center justify-between text-sm'}>
            <div className={'flex gap-8 my-4'}>
                <div className={'flex items-center gap-4 bg-slate-50 p-2 rounded-xl'}>
                    <form action={() => likeAction(postId)}>
                        <button>
                            <Image
                                src={optimisticLike.isLiked
                                     ? '/liked.png'
                                     : '/like.png'
                                }
                                alt={'like'}
                                width={16}
                                height={16}
                                className={'cursor-pointer'}
                            />
                        </button>
                    </form>
                    <span className={'text-gray-300'}>|</span>
                    <span className={'text-gray-500'}>{optimisticLike.likeCount} <span
                        className={'hidden md:inline'}>Likes</span></span>
                </div>
                <div className={'flex items-center gap-4 bg-slate-50 p-2 rounded-xl'}>
                    <Image src={'/comment.png'} alt={'comment'} width={16} height={16}
                           className={'cursor-pointer'}/>
                    <span className={'text-gray-300'}>|</span>
                    <span className={'text-gray-500 flex gap-1'}>
                            <span>{commentCount}</span>
                            <span className={'hidden md:inline'}>Comments</span>
                        </span>
                </div>
            </div>
            <div>
                <div className={'flex items-center gap-4 bg-slate-50 p-2 rounded-xl'}>
                    <Image src={'/share.png'} alt={'comment'} width={16} height={16}
                           className={'cursor-pointer'}/>
                    <span className={'text-gray-300'}>|</span>
                    <span className={'text-gray-500'}>123 <span
                        className={'hidden md:inline'}>Shares</span></span>
                </div>
            </div>
        </div>
    )
}

export default PostInteraction