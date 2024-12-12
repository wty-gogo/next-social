import LeftMenu from '@/app/components/LeftMenu'
import RightMenu from '@/app/components/RightMenu'
import Stories from '@/app/components/Stories'
import AddPost from '@/app/components/AddPost'
import Feed from '@/app/components/Feed'

function HomePage() {
    return (
        <div className={'flex gap-6'}>
            <div className={'hidden xl:flex w-[20%]'}>
                <LeftMenu/>
            </div>
            <div className={'w-full lg:w-[70%] xl:w-[50%]'}>
                <div className={'flex flex-col gap-6'}>
                    <Stories/>
                    <AddPost/>
                    <Feed/>
                </div>
            </div>
            <div className={'hidden lg:block w-[30%]'}>
                <RightMenu/>
            </div>
        </div>
    )
}

export default HomePage