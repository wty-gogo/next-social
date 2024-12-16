import LeftMenu from '@/app/components/LeftMenu'
import Feed from '@/app/components/Feed'
import RightMenu from '@/app/components/RightMenu'
import Image from 'next/image'
import {prisma} from '@/lib'
import {notFound, redirect} from 'next/navigation'
import {auth} from '@clerk/nextjs/server'

type ProfilePageProps = {
    params: Promise<{ username: string }>
}

async function ProfilePage(props: ProfilePageProps) {

    const {username} = await props.params

    const {userId: currentUserId} = await auth()

    if (!currentUserId) return redirect('/sign-in')

    const targetUser = await prisma.user.findFirst(
        {
            where: {
                username: username
            },
            include: {
                _count: {
                    select: {
                        followers: true,
                        followings: true,
                        posts: true,
                    }
                }
            }
        }
    )

    if (!targetUser) return notFound()

    const isBlocked = !!await prisma.block.findFirst(
        {
            where: {
                blockedId: targetUser.id,
                blockerId: currentUserId
            }
        }
    )

    // if (isBlocked) return notFound()

    return (
        <div className={'flex gap-6 pt-6'}>
            <div className={'hidden xl:block w-[20%]'}>
                <LeftMenu type={'profile'}/>
            </div>
            <div className={'w-full lg:w-[70%] xl:w-[50%]'}>
                <div className={'flex flex-col gap-6'}>
                    <div className={'flex flex-col items-center justify-center'}>
                        <div className={'w-full h-64 relative'}>
                            {/*Cover*/}
                            <Image
                                src={targetUser.cover || '/noCover.png'}
                                alt={'profile image'} fill className={'object-cover rounded-md'}/>
                            {/*Avatar*/}
                            <Image
                                src={targetUser.avatar || '/noAvatar.png'}
                                alt={'avatar'} width={128} height={128}
                                className={'w-32 h-32 absolute left-0 right-0 m-auto rounded-full ring-white ring-4 object-cover -bottom-16'}/>
                        </div>
                        {/*Name*/}
                        <h1 className={'mt-20 mb-4 text-2xl font-medium'}>
                            {targetUser.name && targetUser.surname ? targetUser.name + ' ' + targetUser.surname : targetUser.username}
                        </h1>
                        <div className={'flex items-center justify-center gap-12 mb-4'}>
                            <div className={'flex flex-col items-center'}>
                                <span className={'font-medium'}>{targetUser._count.posts}</span>
                                <span className={'text-sm'}>Posts</span>
                            </div>
                            <div className={'flex flex-col items-center'}>
                                <span className={'font-medium'}>{targetUser._count.followers}</span>
                                <span className={'text-sm'}>Followers</span>
                            </div>
                            <div className={'flex flex-col items-center'}>
                                <span className={'font-medium'}>{targetUser._count.followings}</span>
                                <span className={'text-sm'}>Following</span>
                            </div>
                        </div>
                    </div>
                    <Feed/>
                </div>
            </div>
            <div className={'hidden lg:block w-[30%]'}>
                <RightMenu user={targetUser}/>
            </div>
        </div>
    )
}

export default ProfilePage