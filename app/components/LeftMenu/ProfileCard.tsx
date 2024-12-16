import Image from 'next/image'
import {auth} from '@clerk/nextjs/server'
import {prisma} from '@/lib'

async function ProfileCard() {

    const {userId}  = await auth()

    if (!userId) return null

    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
        include: {
            _count:{
                select:{
                    followers: true
                }
            }
        }
    })

    if (!user) return null

    return (
        <div className={'shadow-md rounded-lg bg-white p-4 text-sm flex flex-col gap-6'}>
            {/*Top*/}
            <div className={'relative h-20'}>
                <Image
                    src={user?.cover || '/noCover.png'}
                    alt={''} fill className={'rounded-md object-cover'}/>
                <Image
                    src={user.avatar || '/noAvatar.png'}
                    alt={''}
                    className={'rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-white ring-1 z-10'}
                    width={48} height={48}/>
            </div>
            {/*Bottom*/}
            <div className={'flex flex-col items-center gap-2'}>
                <span className={'font-semibold'}>{user.name && user.surname ? user.name + " " +user.surname : user.username}</span>
                <div className={'flex items-center gap-4'}>
                    <div className={'flex'}>
                        <Image
                            src={'https://images.pexels.com/photos/29711193/pexels-photo-29711193.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                            alt={''}
                            className={'rounded-full object-cover w-3 h-3'}
                            width={12} height={12}/>
                        <Image
                            src={'https://images.pexels.com/photos/29711193/pexels-photo-29711193.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                            alt={''}
                            className={'rounded-full object-cover w-3 h-3'}
                            width={12} height={12}/>
                        <Image
                            src={'https://images.pexels.com/photos/29711193/pexels-photo-29711193.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                            alt={''}
                            className={'rounded-full object-cover w-3 h-3'}
                            width={12} height={12}/>
                    </div>
                    <span className={'text-xs text-gray-500'}>{user._count.followers} Followers</span>
                </div>
                <button className={'bg-blue-500 text-white text-xs p-2 rounded-md'}>My Profile</button>
            </div>
        </div>
    )
}

export default ProfileCard