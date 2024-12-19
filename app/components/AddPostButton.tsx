'use client'

import {useFormStatus} from 'react-dom'

function AddPostButton() {
    const {pending} = useFormStatus()
    return (
        <button disabled={pending} className={'bg-blue-500 p-2 mt-2 rounded-md text-white disabled:bg-gray-300 disabled:cursor-not-allowed'}>
            {pending
             ? 'Sending'
             : 'Send'}
        </button>
    )
}

export default AddPostButton