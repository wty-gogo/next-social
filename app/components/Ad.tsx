import Image from 'next/image'

type AdProps = {
    size?: 'sm' | 'md' | 'lg'
}

function Ad(props: AdProps) {
    const {size = 'lg'} = props
    return (
        <div className={'shadow-md rounded-lg bg-white p-4 text-sm flex flex-col gap-4'}>
            {/*TOP*/}
            <div className={'flex items-center justify-between text-gray-500 font-medium'}>
                <span className={'text-gray-500'}>Sponsored Ads</span>
                <Image src={'/more.png'} alt={'more'} width={16} height={16}/>
            </div>

            <div className={`flex flex-col mt-4 ${size === 'sm' ? 'gap-2' : 'gap-4'}`}>
                <div className={`relative w-full ${size === 'sm' ? 'h-24' : size === 'md' ? 'h-36' : 'h-48'}`}>
                    <Image
                        src={'https://images.pexels.com/photos/29724823/pexels-photo-29724823.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={'ad image'} fill className={'rounded-lg object-cover'}/>
                </div>
                <div className={'flex items-center gap-4'}>
                    <Image
                        src={'https://images.pexels.com/photos/29724823/pexels-photo-29724823.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={''} width={24} height={24} className={'w-6 h-6 rounded-full object-cover'}/>
                    <span>Michael Smith</span>
                </div>
                <p className={size === 'sm' ? 'text-xs' : 'text-sm'}>
                    {
                        size === 'sm'
                            ? <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, sapiente.</>
                            : <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi optio qui repudiandae
                                sed, sint totam voluptatibus. Accusamus alias asperiores, consequatur dignissimos eos facere
                                fugit in laboriosam nemo repellat temporibus vitae.
                            </>
                    }
                </p>
                <button className={'bg-gray-200 text-xs rounded-lg p-2'}>Learn more</button>
            </div>
        </div>
    )
}

export default Ad