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
                <div className={'flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full'}>
                    <input type={'text'} placeholder={'Write a comment...'} className={'bg-transparent outline-none flex-1'}/>
                    <Image src={'/emoji.png'} alt={'emoji'} width={16} height={16} className={'w-4 h-4 rounded-full cursor-pointer'}/>
                </div>
            </div>
            {/*Commons*/}
            <div></div>
        </div>
    )
}

export default Comments