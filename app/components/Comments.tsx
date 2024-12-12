import Image from 'next/image'

function Comments() {
    return (
        <div>
            {/*Write*/}
            <div className={'flex items-center gap-4'}>
                {/*Avatar*/}
                <Image
                    src={'https://images.pexels.com/photos/29661434/pexels-photo-29661434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                    alt={'comment image'} width={32} height={32} className={'w-8 h-8 rounded-full'}
                />
                <div
                    className={'flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full'}>
                    <input type={'text'} placeholder={'Write a comment...'}
                           className={'bg-transparent outline-none flex-1'}/>
                    <Image src={'/emoji.png'} alt={'emoji'} width={16} height={16}
                           className={'w-4 h-4 rounded-full cursor-pointer'}/>
                </div>
            </div>
            {/*Commons*/}
            <div>
                {/*Comment*/}
                <div className={'flex gap-4 justify-between mt-6'}>
                    {/*Avatar*/}
                    <Image
                        src={'https://images.pexels.com/photos/29661434/pexels-photo-29661434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                        alt={'comment image'} width={40} height={40} className={'w-10 h-10 rounded-full'}
                    />
                    {/*Desc*/}
                    <div className={'flex flex-col gap-2 flex-1'}>
                        <span className={'font-medium'}>Lucas Lu</span>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dignissimos neque
                            recusandae? Consequatur cum cumque, debitis delectus ea eius hic illo nemo pariatur
                            perspiciatis quam sapiente vero. Consequatur dignissimos, maxime?
                        </p>
                        <div className={'flex items-center gap-8 text-xs text-gray-500 mt-2'}>
                            <div className={'flex items-center gap-4'}>
                                <Image src={'/like.png'} alt={'comment icon'} width={16} height={16}
                                       className={'cursor-pointer w-4 h-4'}/>
                                <span className={'text-gray-300'}>|</span>
                                <span className={'text-gray-500'}>241 Likes</span>
                            </div>
                            <div className={'cursor-pointer'}>
                                Reply
                            </div>
                        </div>
                    </div>
                    {/*Icon*/}
                    <div>
                        <Image src={'/more.png'} alt={'comment icon'} width={16} height={16}
                               className={'cursor-pointer w-4 h-4'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments