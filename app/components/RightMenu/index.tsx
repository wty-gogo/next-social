import React, {Suspense} from 'react'
import UserMediaCard from '@/app/components/RightMenu/UserMediaCard'
import UserInfoCard from '@/app/components/RightMenu/UserInfoCard'
import FriendRequests from '@/app/components/RightMenu/FriendRequests'
import Birthdays from '@/app/components/RightMenu/Birthdays'
import Ad from '@/app/components/Ad'
import {User} from '@prisma/client'


type RightMenuProps = {
    user?: User
}

function RightMenu(props: RightMenuProps) {

    const {user} = props

    return (
        <div className={'flex flex-col gap-6'}>
            {
                user && <>
                    <Suspense fallback={'loading...'}>
                        <UserInfoCard user={user}/>
                    </Suspense>
                    <Suspense fallback={'loading...'}>
                        <UserMediaCard user={user}/>
                    </Suspense>
                </>
            }
            <FriendRequests/>
            <Birthdays/>
            <Ad size={'md'}/>
        </div>
    )
}

export default RightMenu