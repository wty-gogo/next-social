import React from 'react'
import Link from 'next/link'
import MobileMenu from '@/app/components/MobileMenu'
import Image from 'next/image'
import {ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton} from '@clerk/nextjs'

function Navbar() {
    return (
        <div className={'h-24 flex justify-between items-center'}>

            {/*左侧*/}
            <div className={'md:hidden lg:block w-[20%]'}>
                <Link href={'/'} className={'font-bold text-xl text-blue-500'}>NEXT SOCIAL</Link>
            </div>

            {/*中间*/}
            <div className={'hidden md:flex w-[50%] justify-center gap-6'}>

                {/*Links*/}
                <div className={'flex gap-6 text-gray-600'}>
                    <Link href={'/'} className={'flex items-center gap-2'}>
                        <Image src={'/home.png'} alt={'Homepage'} width={16} height={16} className={'w-4 h-4'}/>
                        <span>Homepage</span>
                    </Link>
                    <Link href={'/'} className={'flex items-center gap-2'}>
                        <Image src={'/friends.png'} alt={'Homepage'} width={16} height={16} className={'w-4 h-4'}/>
                        <span>Friends</span>
                    </Link>
                    <Link href={'/'} className={'flex items-center gap-2'}>
                        <Image src={'/stories.png'} alt={'Homepage'} width={16} height={16} className={'w-4 h-4'}/>
                        <span>Stories</span>
                    </Link>
                </div>

                {/*Search*/}
                <div className={'hidden xl:flex bg-slate-100 items-center p-2 rounded-xl'}>
                    <input type={'search'} placeholder={'search...'} className={'bg-transparent outline-none'}/>
                    <Image src={'/search.png'} alt={'search'} width={14} height={14}/>
                </div>
            </div>

            {/*右侧*/}
            <div className={'w-[30%] flex items-center gap-4 xl:gap-8 justify-end'}>
                <ClerkLoading>
                    <div
                        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <div>
                            <Image src={'/people.png'} alt={'people'} width={24} height={24}/>
                        </div>
                        <div>
                            <Image src={'/messages.png'} alt={'message'} width={20} height={20}/>
                        </div>
                        <div>
                            <Image src={'/notifications.png'} alt={'notification'} width={20} height={20}/>
                        </div>
                        <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <div className={'flex items-center gap-2 text-sm'}>
                            <Image src={'/login.png'} alt={'login'} width={20} height={20}/>
                            <Link href={'/sign-in'}>Login/Register</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
                <MobileMenu/>
            </div>
        </div>
    )
}

export default Navbar