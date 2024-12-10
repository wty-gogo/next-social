import LeftMenu from '@/app/components/LeftMenu'
import RightMenu from '@/app/components/RightMenu'
import Stories from '@/app/components/Stories'
import AddPost from '@/app/components/AddPost'
import Feed from '@/app/components/Feed'

function HomePage() {
    return <div className={'flex gap-6'}>
        <div className={'rounded-xl hidden xl:flex w-[20%]'}>
            <LeftMenu/>
        </div>
        <div className={'w-full  rounded-xl lg:w-[70%] xl:w-[50%]'}>
            <div className={'flex flex-col gap-6'}>
                <Stories/>
                <AddPost/>
                <Feed/>
            </div>
        </div>
        <div className={' rounded-xl hidden lg:flex w-[30%]'}>
            <RightMenu/>
        </div>
    </div>
}

export default HomePage