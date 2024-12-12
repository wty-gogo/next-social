import Link from 'next/link'
import Image from 'next/image'

type UserMediaCardProps = {
    userId: string;
}

function UserMediaCard(props: UserMediaCardProps) {
    const {} = props
    return (
        <div className={'shadow-md rounded-lg bg-white p-4 text-sm flex flex-col gap-4'}>
            {/*TOP*/}
            <div className={'flex justify-between items-center font-medium'}>
                <span className={'text-gray-500'}>User Media</span>
                <Link href={'/'} className={'text-xs text-blue-500'}>See All</Link>
            </div>
            {/*Bottom*/}
            <div className={'flex flex-wrap gap-4 justify-between'}>
                <div className={'relative w-1/5 h-24'}>
                    <Image
                        src={'https://images.pexels.com/photos/29724820/pexels-photo-29724820.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={'media'} fill className={'object-cover rounded-md'}/>
                </div>
                <div className={'relative w-1/5 h-24'}>
                    <Image
                        src={'https://images.pexels.com/photos/29724820/pexels-photo-29724820.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={'media'} fill className={'object-cover rounded-md'}/>
                </div>
                <div className={'relative w-1/5 h-24'}>
                    <Image
                        src={'https://images.pexels.com/photos/29724820/pexels-photo-29724820.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={'media'} fill className={'object-cover rounded-md'}/>
                </div>
                <div className={'relative w-1/5 h-24'}>
                    <Image
                        src={'https://images.pexels.com/photos/29724820/pexels-photo-29724820.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={'media'} fill className={'object-cover rounded-md'}/>
                </div>
                <div className={'relative w-1/5 h-24'}>
                    <Image
                        src={'https://images.pexels.com/photos/29724820/pexels-photo-29724820.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={'media'} fill className={'object-cover rounded-md'}/>
                </div>
                <div className={'relative w-1/5 h-24'}>
                    <Image
                        src={'https://images.pexels.com/photos/29724820/pexels-photo-29724820.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={'media'} fill className={'object-cover rounded-md'}/>
                </div>
                <div className={'relative w-1/5 h-24'}>
                    <Image
                        src={'https://images.pexels.com/photos/29724820/pexels-photo-29724820.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={'media'} fill className={'object-cover rounded-md'}/>
                </div>
                <div className={'relative w-1/5 h-24'}>
                    <Image
                        src={'https://images.pexels.com/photos/29724820/pexels-photo-29724820.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={'media'} fill className={'object-cover rounded-md'}/>
                </div>
            </div>
        </div>
    )
}

export default UserMediaCard