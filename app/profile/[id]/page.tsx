import LeftMenu from '@/app/components/LeftMenu'
import Feed from '@/app/components/Feed'
import RightMenu from '@/app/components/RightMenu'
import Image from 'next/image'

function ProfilePage() {


    return (
        <div className={'flex gap-6 pt-6'}>
            <div className={'hidden xl:block w-[20%]'}>
                <LeftMenu type={'profile'}/>
            </div>
            <div className={'w-full lg:w-[70%] xl:w-[50%]'}>
                <div className={'flex flex-col gap-6'}>
                    <div className={'flex flex-col items-center justify-center'}>
                        <div className={'w-full h-64 relative'}>
                            <Image
                                src={'https://images.pexels.com/photos/29715753/pexels-photo-29715753.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                                alt={'profile image'} fill className={'object-cover rounded-md'}/>
                            <Image
                                src={'https://images.pexels.com/photos/14823896/pexels-photo-14823896.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                                alt={'avatar'} width={128} height={128}
                                className={'w-32 h-32 absolute left-0 right-0 m-auto rounded-full ring-white ring-4 object-cover -bottom-16'}/>
                        </div>
                        <h1 className={'mt-20 mb-4 text-2xl font-medium'}>
                            Daniel Anderson
                        </h1>
                        <div className={'flex items-center justify-center gap-12 mb-4'}>
                            <div className={'flex flex-col items-center'}>
                                <span className={'font-medium'}>116</span>
                                <span className={'text-sm'}>Posts</span>
                            </div>
                            <div className={'flex flex-col items-center'}>
                                <span className={'font-medium'}>116</span>
                                <span className={'text-sm'}>Followers</span>
                            </div>
                            <div className={'flex flex-col items-center'}>
                                <span className={'font-medium'}>12</span>
                                <span className={'text-sm'}>Following</span>
                            </div>
                        </div>
                    </div>
                    <Feed/>
                </div>
            </div>
            <div className={'hidden lg:block w-[30%]'}>
                <RightMenu userId={'123'}/>
            </div>
        </div>
    )
}

export default ProfilePage