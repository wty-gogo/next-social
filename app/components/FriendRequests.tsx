import Link from 'next/link'
import Image from 'next/image'

function FriendRequests() {
    return (
        <div className={'shadow-md rounded-lg bg-white p-4 text-sm flex flex-col gap-4'}>
            {/*TOP*/}
            <div className={'flex justify-between items-center font-medium'}>
                <span className={'text-gray-500'}>Friend Requests</span>
                <Link href={'/'} className={'text-xs text-blue-500'}>See All</Link>
            </div>
            {/*User*/}
            <div className={'flex items-center justify-between '}>
                <div className={'flex items-center gap-4'}>
                    <Image
                        src={'https://images.pexels.com/photos/29727712/pexels-photo-29727712.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={''} width={40} height={40} className={'w-10 h-10 rounded-full object-cover'}/>
                    <span className={'font-bold'}>Chris Wash</span>
                </div>
                <div className={'flex gap-3'}>
                    <Image src={'/accept.png'} alt={'accept'} width={16} height={16} className={'cursor-pointer'}/>
                    <Image src={'/reject.png'} alt={'accept'} width={16} height={16} className={'cursor-pointer'}/>
                </div>
            </div>
            <div className={'flex items-center justify-between '}>
                <div className={'flex items-center gap-4'}>
                    <Image
                        src={'https://images.pexels.com/photos/29727712/pexels-photo-29727712.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={''} width={40} height={40} className={'w-10 h-10 rounded-full object-cover'}/>
                    <span className={'font-bold'}>Chris Wash</span>
                </div>
                <div className={'flex gap-3'}>
                    <Image src={'/accept.png'} alt={'accept'} width={16} height={16} className={'cursor-pointer'}/>
                    <Image src={'/reject.png'} alt={'accept'} width={16} height={16} className={'cursor-pointer'}/>
                </div>
            </div>
            <div className={'flex items-center justify-between '}>
                <div className={'flex items-center gap-4'}>
                    <Image
                        src={'https://images.pexels.com/photos/29727712/pexels-photo-29727712.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={''} width={40} height={40} className={'w-10 h-10 rounded-full object-cover'}/>
                    <span className={'font-bold'}>Chris Wash</span>
                </div>
                <div className={'flex gap-3'}>
                    <Image src={'/accept.png'} alt={'accept'} width={16} height={16} className={'cursor-pointer'}/>
                    <Image src={'/reject.png'} alt={'accept'} width={16} height={16} className={'cursor-pointer'}/>
                </div>
            </div>
        </div>
    )
}

export default FriendRequests