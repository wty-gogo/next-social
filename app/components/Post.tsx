import Image from 'next/image'
import Comments from '@/app/components/Comments'

function Post() {
    return (
        <div className={'flex flex-col gap-4'}>
            {/*User*/}
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-4'}>
                    <Image
                        src={'https://images.pexels.com/photos/9477631/pexels-photo-9477631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                        alt={'avatar'} className={'w-10 h-10 rounded-full'} width={40} height={40}/>
                    <span className={'font-medium'}>Hades Wang</span>
                </div>
                <Image src={'/more.png'} alt={'more'} width={16} height={16} className={'cursor-pointer'}/>
            </div>
            {/*Desc*/}
            <div className={'flex flex-col gap-4'}>
                <div className={'w-full min-h-96 relative'}>
                    <Image
                        src={'https://images.pexels.com/photos/19051372/pexels-photo-19051372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                        alt={'image'}
                        fill
                        className={'object-cover rounded-md'}
                    />
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid consequatur corporis
                    cum ducimus enim, harum iusto laudantium perferendis quis ut, vel voluptatum. Culpa, dignissimos
                    exercitationem officia quis recusandae soluta?
                </p>
            </div>
            {/*Interaction*/}
            <div className={'flex items-center justify-between text-sm'}>
                <div className={'flex gap-8 my-4'}>
                    <div className={'flex items-center gap-4 bg-slate-50 p-2 rounded-xl'}>
                        <Image src={'/like.png'} alt={'like'} width={16} height={16} className={'cursor-pointer'}/>
                        <span className={'text-gray-300'}>|</span>
                        <span className={'text-gray-500'}>123 <span className={'hidden md:inline'}>Likes</span></span>
                    </div>
                    <div className={'flex items-center gap-4 bg-slate-50 p-2 rounded-xl'}>
                        <Image src={'/comment.png'} alt={'comment'} width={16} height={16}
                               className={'cursor-pointer'}/>
                        <span className={'text-gray-300'}>|</span>
                        <span className={'text-gray-500'}>123 <span
                            className={'hidden md:inline'}>Comments</span></span>
                    </div>
                </div>
                <div>
                    <div className={'flex items-center gap-4 bg-slate-50 p-2 rounded-xl'}>
                        <Image src={'/share.png'} alt={'comment'} width={16} height={16}
                               className={'cursor-pointer'}/>
                        <span className={'text-gray-300'}>|</span>
                        <span className={'text-gray-500'}>123 <span
                            className={'hidden md:inline'}>Shares</span></span>
                    </div>
                </div>
            </div>
            <Comments/>
        </div>
    )
}

export default Post