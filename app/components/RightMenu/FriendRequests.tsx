import Link from 'next/link'
import Image from 'next/image'
import {auth} from '@clerk/nextjs/server'
import {prisma} from '@/lib'

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
            {
                requests.map((request) => (
                    <div className={'flex items-center justify-between '}>
                        <div className={'flex items-center gap-4'}>
                            <Image
                                src={request.sender.avatar || '/noAvatar.png'}
                                alt={''} width={40} height={40} className={'w-10 h-10 rounded-full object-cover'}/>
                            <span className={'font-bold'}>Chris Wash</span>
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
        </div>
    )
}

export default FriendRequests