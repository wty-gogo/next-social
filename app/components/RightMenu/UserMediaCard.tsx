import Link from 'next/link'
import Image from 'next/image'
import {User} from '@prisma/client'
import {prisma} from '@/lib'

type UserMediaCardProps = {
    user: User;
}

async function UserMediaCard(props: UserMediaCardProps) {
    const {user} = props

    const postsWithMedia = await prisma.post.findMany({
        where: {
            userId: user.id,
            img: {
                not: null
            }
        },
        take: 8,
        orderBy: {
            createAt: 'desc'
        }
    })

    return (
        <div className={'shadow-md rounded-lg bg-white p-4 text-sm flex flex-col gap-4'}>
            {/*TOP*/}
            <div className={'flex justify-between items-center font-medium'}>
                <span className={'text-gray-500'}>User Media</span>
                <Link href={'/'} className={'text-xs text-blue-500'}>See All</Link>
            </div>
            {/*Bottom*/}
            <div className={'flex flex-wrap gap-4 justify-between'}>
                {
                    postsWithMedia.length
                        ? postsWithMedia.map((media) => (
                            <div className={'relative w-1/5 h-24'} key={media.id}>
                                <Image
                                    src={media.img!}
                                    alt={'media'} fill className={'object-cover rounded-md'}/>
                            </div>))
                        : <div className={'w-full text-center text-gray-500'}>
                            No Media Found
                        </div>

                }
            </div>
        </div>
    )
}

export default UserMediaCard