import Link from 'next/link'
import Image from 'next/image'

type UserInfoCardProps = {
    userId: string;
}

function UserInfoCard(props: UserInfoCardProps) {
    const {} = props
    return (
        <div className={'shadow-md rounded-lg bg-white p-4 text-sm flex flex-col gap-4'}>
            {/*TOP*/}
            <div className={'flex justify-between items-center font-medium'}>
                <span className={'text-gray-500'}>User Information</span>
                <Link href={'/'} className={'text-xs text-blue-500'}>See All</Link>
            </div>
            {/*Bottom*/}
            <div className={'flex flex-col gap-4 text-gray-500'}>
                <div className={'flex items-center gap-2'}>
                    <span className={'text-xl text-black'}>Jessica Brown</span>
                    <span className={'text-sm'}>@happy_cat</span>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, debitis dignissimos eaque
                    eligendi enim, error excepturi facilis fugiat incidunt laudantium neque officiis possimus provident
                    quae quos sunt tempora. Fugiat, rem?
                </p>
                <div className={'flex items-center gap-2'}>
                    <Image src={'/map.png'} alt={'map'} width={16} height={16}/>
                    <span>Live in <b>Denver</b></span>
                </div>
                <div className={'flex items-center gap-2'}>
                    <Image src={'/school.png'} alt={'school'} width={16} height={16}/>
                    <span>Went to <b>Edgar High School</b></span>
                </div>
                <div className={'flex items-center gap-2'}>
                    <Image src={'/work.png'} alt={'work'} width={16} height={16}/>
                    <span>Works at <b>Apple Inc.</b></span>
                </div>
                <div className={'flex items-center justify-between'}>
                    <div className={'flex items-center gap-1'}>
                        <Image src={'/link.png'} alt={'link'} width={16} height={16}/>
                        <Link href={'https://lama.dev'} className={'text-blue-500 font-medium'}>lama.dev</Link>
                    </div>
                    <div className={'flex items-center gap-1'}>
                        <Image src={'/date.png'} alt={'date'} width={16} height={16}/>
                        <span>Joined November 2024</span>
                    </div>
                </div>
                <button className={'bg-blue-500 text-white rounded-md text-sm p-2'}>Follow</button>
                <span className={'text-red-400 self-end text-xs cursor-pointer'}>Block User</span>
            </div>
        </div>
    )
}

export default UserInfoCard