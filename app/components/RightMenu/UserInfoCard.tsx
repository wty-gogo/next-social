import Link from 'next/link'
import Image from 'next/image'
import {User} from '@prisma/client'
import {prisma} from '@/lib'
import {auth} from '@clerk/nextjs/server'
import {redirect} from 'next/navigation'
import UserInfoCardInteraction from '@/app/components/RightMenu/UserInfoCardInteraction'
import UpdateUser from '@/app/components/RightMenu/UpdateUser'

type UserInfoCardProps = {
    user: User;
}

async function UserInfoCard(props: UserInfoCardProps) {
    const {user} = props
    const {userId: currentUserId} = await auth()

    if (!currentUserId) return redirect('/sign-in')

    const createArDate = new Date(user.createAt)

    const formattedDate = createArDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    const isUserBlocked = !!await prisma.block.findFirst({
        where: {
            blockerId: currentUserId,
            blockedId: user.id
        }
    })
    const isFollowing = !!await prisma.follower.findFirst({
        where: {
            followerId: currentUserId,
            followingId: user.id
        }
    })
    const isFollowingRequestSent = !!await prisma.followRequest.findFirst({
        where: {
            senderId: currentUserId,
            receiverId: user.id
        }
    })

    return (
        <div className={'shadow-md rounded-lg bg-white p-4 text-sm flex flex-col gap-4'}>
            {/*TOP*/}
            <div className={'flex justify-between items-center font-medium'}>
                <span className={'text-gray-500'}>User Information</span>
                {
                    currentUserId === user.id
                        ? <UpdateUser/>
                        : <Link href={'/'} className={'text-xs text-blue-500'}>See All</Link>
                }
            </div>
            {/*Bottom*/}
            <div className={'flex flex-col gap-4 text-gray-500'}>
                <div className={'flex items-center gap-2'}>
                    <span
                        className={'text-xl text-black'}>{user.name && user.surname ? user.name + ' ' + user.surname : user.username}</span>
                    <span className={'text-sm'}>@{user.username}</span>
                </div>
                {/*Description*/}
                {user.description && <p>{user.description}</p>}
                {
                    user.city && <div className={'flex items-center gap-2'}>
                        <Image src={'/map.png'} alt={'map'} width={16} height={16}/>
                        <span>Live in <b>{user.city}</b></span>
                    </div>
                }
                {
                    user.school && <div className={'flex items-center gap-2'}>
                        <Image src={'/school.png'} alt={'school'} width={16} height={16}/>
                        <span>Went to <b>{user.school}</b></span>
                    </div>
                }
                {
                    user.work && <div className={'flex items-center gap-2'}>
                        <Image src={'/work.png'} alt={'work'} width={16} height={16}/>
                        <span>Works at <b>{user.work}</b></span>
                    </div>
                }
                <div className={'flex items-center justify-between'}>
                    {
                        user.website && <div className={'flex items-center gap-1'}>
                            <Image src={'/link.png'} alt={'link'} width={16} height={16}/>
                            <Link href={user.website} className={'text-blue-500 font-medium'}>user.website</Link>
                        </div>
                    }
                    <div className={'flex items-center gap-1'}>
                        <Image src={'/date.png'} alt={'date'} width={16} height={16}/>
                        <span>Joined {formattedDate}</span>
                    </div>
                </div>
                {
                    currentUserId && currentUserId !== user.id && <UserInfoCardInteraction
                        targetUserId={user.id}
                        isFollowing={isFollowing}
                        isUserBlocked={isUserBlocked}
                        isFollowingRequestSent={isFollowingRequestSent}
                    />
                }
            </div>
        </div>
    )
}

export default UserInfoCard