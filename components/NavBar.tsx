import React from 'react'
import {useRouter} from 'next/router';
import Link from 'next/link';
export default function NavBar() {
  const router = useRouter();
  return (
    <div className='grid justify-items-center'>
      <div  className='fixed container  mt-5 flex justify-end'>
        <div>
          <Link href='/signin'>
            <button  className='bg-white px-3 py-1 mx-2 rounded-sm font-medium'>
                sign in
            </button>
          </Link>
          <Link href={'/signup'}>
            <button className=' bg-[#8e4ae5] text-white px-2 py-1 mx-2 rounded-sm font-medium'>
                sign up
            </button>
          </Link>
        </div>
      </div>
    </div>

  )
}
