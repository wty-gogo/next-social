'use client'

import Image from 'next/image'
import {Comment, User} from '@prisma/client'
import React, {PropsWithChildren, useOptimistic, useState} from 'react'
import {addComment} from '@/lib'

type CommentWithUser = Comment & { user: User }

type CommentListProps = PropsWithChildren<{
    comments: CommentWithUser[]
    postId: number,
    user: User
}>

const CommentList: React.FC<CommentListProps> = (props) => {

    const {postId, comments, user} = props

    const [commentState, setCommentState] = useState(comments)
    const [desc, setDesc] = useState('')

    const [optimisticComments, addOptimisticComment] = useOptimistic(
        commentState,
        (state, action: CommentWithUser) => {
            return [action, ...state]
        }
    )

    const add = async (desc: string) => {
        if (!user || !desc) return

        addOptimisticComment({
            user: {
                ...user
            },
            desc: desc,
            id: Math.random() * 100,
            createAt: new Date(Date.now()),
            updateAt: new Date(Date.now()),
            userId: user.id,
            postId: postId
        })

        try {
            const createdComment = await addComment(postId, desc)
            setCommentState((prevState) => {
                return [...prevState, createdComment]
            })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            {/*Write*/}
            {
                user && <div className={'flex items-center gap-4'}>
                    {/*Avatar*/}
                    <Image
                        src={user?.avatar || '/noAvatar.png'}
                        alt={'comment image'} width={32} height={32} className={'w-8 h-8 rounded-full'}
                    />
                    <form
                        action={() => add(desc)}
                        className={'flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full'}>
                        <input
                            type={'text'}
                            placeholder={'Write a comment...'}
                            className={'bg-transparent outline-none flex-1'}
                            onChange={e => setDesc(e.target.value)}
                        />
                        <Image src={'/emoji.png'} alt={'emoji'} width={16} height={16}
                               className={'w-4 h-4 rounded-full cursor-pointer'}/>
                    </form>
                </div>
            }
            {/*Commons*/}
            <div>
                {/*Comment*/}
                {
                    optimisticComments?.length
                    ? optimisticComments.map((comment) => (
                        <div className={'flex gap-4 justify-between mt-6'} key={comment.id}>
                            {/*Avatar*/}
                            <Image
                                src={comment.user.avatar || '/noAvatar.png'}
                                alt={'comment image'} width={40} height={40} className={'w-10 h-10 rounded-full'}
                            />
                            {/*Desc*/}
                            <div className={'flex flex-col gap-2 flex-1'}>
                               <span className={'font-medium'}> {
                                   comment.user.name && comment.user.surname
                                   ? comment.user.name + ' ' + comment.user.surname
                                   : comment.user.username
                               }</span>

                                <p>{comment.desc}</p>

                                <div className={'flex items-center gap-8 text-xs text-gray-500 mt-2'}>
                                    <div className={'flex items-center gap-4'}>
                                        <Image src={'/like.png'} alt={'comment icon'} width={16} height={16}
                                               className={'cursor-pointer w-4 h-4'}/>
                                        <span className={'text-gray-300'}>|</span>
                                        <span className={'text-gray-500'}>111 Likes</span>
                                    </div>
                                    <div className={'cursor-pointer'}>
                                        Reply
                                    </div>
                                </div>
                            </div>
                            {/*Icon*/}
                            <div>
                                <Image src={'/more.png'} alt={'comment icon'} width={16} height={16}
                                       className={'cursor-pointer w-4 h-4'}/>
                            </div>
                        </div>
                    ))
                    : 'No comments found.'
                }
            </div>
        </>
    )
}

export default CommentList