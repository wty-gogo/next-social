import Link from 'next/link'
import Image from 'next/image'
import {auth} from '@clerk/nextjs/server'
import {prisma} from '@/lib'
import FriendRequestList from '@/app/components/RightMenu/FriendRequestList'

async function FriendRequests() {

    const {userId: currentUserId} = await auth()

    if (!currentUserId) return null

    const requests = await prisma.followRequest.findMany({
        where: {
            receiverId: currentUserId
        },
        include: {
            sender: true
        }
    })

    if (!requests.length) return null

    return (
        <div className={'shadow-md rounded-lg bg-white p-4 text-sm flex flex-col gap-4'}>
            {/*TOP*/}
            <div className={'flex justify-between items-center font-medium'}>
                <span className={'text-gray-500'}>Friend Requests</span>
                <Link href={'/'} className={'text-xs text-blue-500'}>See All</Link>
            </div>
            {/*User*/}
            <FriendRequestList requests={requests} />
        </div>
    )
}

export default FriendRequests