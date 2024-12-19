import Image from 'next/image'
import {prisma} from '@/lib'
import CommentList from '@/app/components/Feed/CommentList'
import {auth} from '@clerk/nextjs/server'
import {redirect} from 'next/navigation'

type CommentProps = {
    postId: number
}

async function Comments(props: CommentProps) {

    const {postId} = props

    const {userId: currentUserId} = await auth()

    if (!currentUserId) redirect('sign-in')

    const userInfo = await prisma.user.findFirst({
        where: {
            id: currentUserId
        }
    })

    if (!userInfo) redirect('sign-in')

    const comments = await prisma.comment.findMany({
        where: {
            postId: postId
        },
        include: {
            user: true
        },
        orderBy: {
            createAt: 'desc'
        }
    })

    return (
        <div>
           <CommentList comments={comments} postId={postId} user={userInfo} />
        </div>
    )
}

export default Comments