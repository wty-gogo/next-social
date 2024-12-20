import Image from 'next/image'
import Comments from '@/app/components/Feed/Comments'
import type {Post as PostType, User} from '@prisma/client'
import PostInteraction from '@/app/components/Feed/PostInteraction'
import {auth} from '@clerk/nextjs/server'
import {Suspense} from 'react'
import PostInfo from '@/app/components/Feed/PostInfo'


type FeedPostType = PostType & { user: User } & { likes: { userId: string }[] } & { _count: { comments: number } }

type PostProps = {
    post: FeedPostType
}

async function Post(props: PostProps) {
    const {post} = props
    const {userId: currentUserId} = await auth()

    if (!post || !currentUserId) {
        return null
    }

    return (
        <div className={'flex flex-col gap-4'}>
            {/*User*/}
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-4'}>
                    <Image
                        src={post.user.avatar || '/noAvatar.png'}
                        alt={'avatar'} className={'w-10 h-10 rounded-full'} width={40} height={40}/>
                    <span className={'font-medium'}>
                        {
                            post.user.name && post.user.surname
                            ? post.user.name + ' ' + post.user.surname
                            : post.user.username
                        }
                    </span>
                </div>
                {
                    post.userId === currentUserId &&  <PostInfo postId={post.id}/>
                }
            </div>
            {/*Desc*/}
            <div className={'flex flex-col gap-4'}>
                {
                    post.img && <div className={'w-full min-h-96 relative'}>
                        <Image
                            src={post.img}
                            alt={'image'}
                            fill
                            className={'object-cover rounded-md'}
                        />
                    </div>
                }
                <p>
                    {post.desc}
                </p>
            </div>
            {/*Interaction*/}
            <Suspense fallback={'pending...'}>
                <PostInteraction
                    currentUserId={currentUserId}
                    postId={post.id}
                    likes={post.likes.map(v => v.userId)}
                    commentCount={post._count.comments}
                />
            </Suspense>
            <Comments postId={post.id}/>
        </div>
    )
}

export default Post