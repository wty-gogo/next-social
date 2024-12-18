import Image from 'next/image'
import {prisma} from '@/lib'
import CommentList from '@/app/components/Feed/CommentList'

type CommentProps = {
    postId: number
}

async function Comments(props: CommentProps) {

    const {postId} = props

    const comments = await prisma.comment.findMany({
        where: {
            postId: postId
        },
        include: {
            user: true
        }
    })

    return (
        <div>
           <CommentList comments={comments} postId={postId} />
        </div>
    )
}

export default Comments