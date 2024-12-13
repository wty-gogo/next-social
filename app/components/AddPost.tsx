import React from 'react'
import Image from 'next/image'

// 123

async function AddPost() {

    return (
        <div className={'p-4 bg-white rounded-lg flex gap-4 text-sm justify-between shadow-md'}>
            {/*Avatar*/}
            <Image
                src={'https://images.pexels.com/photos/29334426/pexels-photo-29334426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                alt={''} width={48} height={48} className={'w-12 h-12 object-cover rounded-full'}
            />
            {/*Post*/}
            <div className={'flex-1 p-2'}>
                {/*text input*/}
                <form action={''} className={'flex gap-4'}>
                    <textarea name={'desc'} className={'flex-1'} placeholder={'What is on your mind?'}/>
                    <Image src={'/emoji.png'} alt={'emoji'} className={'w-5 h-5 cursor-pointer self-end'} width={20}
                           height={20}/>
                    <button type={'submit'}>send</button>
                </form>
                {/*post options*/}
                <div className={'flex mt-4 items-center gap-4 text-gray-400 flex-wrap'}>
                    <div className={'flex items-center gap-2 cursor-pointer'}>
                        <Image src={'/addImage.png'} alt={'emoji'} className={'w-5 h-5 cursor-pointer self-end'}
                               width={20}
                               height={20}/>
                        Photo
                    </div>
                    <div className={'flex items-center gap-2 cursor-pointer'}>
                        <Image src={'/addVideo.png'} alt={'emoji'} className={'w-5 h-5 cursor-pointer self-end'}
                               width={20}
                               height={20}/>
                        Video
                    </div>
                    <div className={'flex items-center gap-2 cursor-pointer'}>
                        <Image src={'/poll.png'} alt={'emoji'} className={'w-5 h-5 cursor-pointer self-end'} width={20}
                               height={20}/>
                        Poll
                    </div>
                    <div className={'flex items-center gap-2 cursor-pointer'}>
                        <Image src={'/addEvent.png'} alt={'emoji'} className={'w-5 h-5 cursor-pointer self-end'}
                               width={20}
                               height={20}/>
                        Event
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost