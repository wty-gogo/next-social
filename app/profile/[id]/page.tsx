import LeftMenu from '@/app/components/LeftMenu'
import Feed from '@/app/components/Feed'
import RightMenu from '@/app/components/RightMenu'

function ProfilePage() {


    return (
        <div className={'flex gap-6'}>
            <div className={'hidden xl:flex w-[20%]'}>
                <LeftMenu/>
            </div>
            <div className={'w-full lg:w-[70%] xl:w-[50%]'}>
                <div className={'flex flex-col gap-6'}>
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