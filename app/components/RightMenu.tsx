import React from 'react'
import FriendRequests from '@/app/components/FriendRequests'
import Birthdays from '@/app/components/Birthdays'
import Ad from '@/app/components/Ad'
import UserInfoCard from '@/app/components/UserInfoCard'
import UserMediaCard from '@/app/components/UserMediaCard'

type RightMenuProps = {
    userId?: string
}

function RightMenu(props: RightMenuProps) {

    const {userId} = props

    return (
        <div className={'flex flex-col gap-6'}>
            {
                userId && <>
                    <UserInfoCard userId={userId}/>
                    <UserMediaCard userId={userId}/>
                </>
            }
            <FriendRequests/>
            <Birthdays/>
            <Ad size={'md'}/>
        </div>
    )
}

export default RightMenu