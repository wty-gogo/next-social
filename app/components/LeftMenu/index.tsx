import Link from 'next/link'
import Image from 'next/image'
import Ad from '@/app/components/Ad'
import ProfileCard from '@/app/components/LeftMenu/ProfileCard'

type LeftMenuProps = {
    type: 'home' | 'profile'
}

function LeftMenu(props: LeftMenuProps) {
    const {type} = props

    const linkData = [
        {
            title: 'My Posts',
            img: '/posts.png',
            url: ''
        },
        {
            title: 'Activity',
            img: '/activity.png',
            url: ''
        },
        {
            title: 'Marketplace',
            img: '/market.png',
            url: ''
        },
        {
            title: 'Events',
            img: '/events.png',
            url: ''
        },
        {
            title: 'Albums',
            img: '/albums.png',
            url: ''
        },
        {
            title: 'Videos',
            img: '/videos.png',
            url: ''
        },
        {
            title: 'News',
            img: '/news.png',
            url: ''
        },
        {
            title: 'Courses',
            img: '/courses.png',
            url: ''
        },
        {
            title: 'Lists',
            img: '/lists.png',
            url: ''
        },
        {
            title: 'Settings',
            img: '/settings.png',
            url: ''
        },
    ]

    return (
        <div className={'flex flex-col gap-6'}>
            {
                type === 'home' && <ProfileCard/>
            }
            <div className={'shadow-md rounded-lg bg-white p-4 text-sm text-gray-500 flex flex-col gap-2'}>
                {
                    linkData.map((v, i) => (
                        <Link key={i} href={'/'} className={'flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100'}>
                            <Image src={v.img} alt={'My Posts'} width={16} height={16}/>
                            <span>{v.title}</span>
                        </Link>
                    ))
                }
                <hr className={'border-t-1 border-gray-50 w-36'} />
            </div>
            <Ad size={'sm'}/>
        </div>
    )
}

export default LeftMenu