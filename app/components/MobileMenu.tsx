'use client'

import React, {useState} from 'react'

function MobileMenu() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={'md:hidden'}>
            <div
                className={'flex flex-col gap-[4px] cursor-pointer'}
                onClick={() => setIsOpen((prevState) => !prevState)}
            >
                <div className={`w-6 h-1 bg-blue-500 rounded-sm origin-left ease-in-out duration-500 ${isOpen ? 'rotate-45' : ''}`}/>
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ease-in-out duration-500 ${isOpen ? 'opacity-0' : ''}`}/>
                <div className={`w-6 h-1 bg-blue-500 rounded-sm origin-left ease-in-out duration-500 ${isOpen ? '-rotate-45' : ''}`}/>
            </div>
            {
                isOpen &&
                (
                    <div
                        className={'absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center font-bold'}>
                        <div>Home</div>
                        <div>Friends</div>
                        <div>Group</div>
                        <div>Stories</div>
                        <div>Login</div>
                    </div>
                )
            }
        </div>
    )
}

export default MobileMenu