import Link from 'next/link'
import Image from 'next/image'

function Birthdays() {
    return (
        <div className={'shadow-md rounded-lg bg-white p-4 text-sm flex flex-col gap-4'}>
            {/*TOP*/}
            <div className={'font-medium'}>
                <span className={'text-gray-500'}>Birthdays</span>
            </div>
            {/*Friends*/}
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-4'}>
                    <Image
                        src={'https://images.pexels.com/photos/29727418/pexels-photo-29727418.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'}
                        alt={'birthday friend'} width={40} height={40} className={'w-10 h-10 object-cover rounded-full'}
                    />
                    <span className={'font-semibold'}>Emily Johnson</span>
                </div>
                <button className={'bg-blue-500 rounded-md px-2 py-1 text-white text-xs'}>Celebrate</button>
            </div>
            {/*UpComing*/}
            <div className={'p-4 bg-slate-100 rounded-lg flex items-center gap-4'}>
                <Image src={'/gift.png'} alt={'gift'} width={24} height={24} className={'w-6 h-6'}/>
                <Link href={'/'} className={'flex flex-col gap-1 text-xs'}>
                    <span className={'font-semibold text-gray-700'}>Upcoming Birthdays</span>
                    <span className={'text-gray-500'}>See other 16 have upcoming birthdays</span>
                </Link>
            </div>
        </div>
    )
}

export default Birthdays