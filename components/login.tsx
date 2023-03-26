import React from 'react'
import Img from 'next/image';
import {signIn } from "next-auth/react"
import {useSession,signOut,getSession} from "next-auth/react";      
import type { GetServerSideProps} from 'next';

export default function Login() {
  const {data:session} = useSession();
    async function googleAuthHandlere(){
        signIn('google',{callbackUrl:'http://localhost:3003'});
    }
    if(session?.user) {
      return( 
      <div className='flex  items-center justify-end gap-7 mt-3 fixed w-full'>
          <p className='font-bold'>Name: <span className='font-normal'>{session.user.name}</span></p>
          <button onClick={() => signOut()} className=' border  px-2 py-1 rounded bg-white mr-3'>Sign out</button>
      </div>
      )
    }
  return (
    <div className='flex justify-center w-full  fixed h-screen  items-center'>
        <button className='flex bg-white justify-between gap-6 items-center px-4 py-1 rounded-sm mt-2 mr-2' onClick={googleAuthHandlere}>Log in with 
            <Img src={'/google-circle.svg'} alt='google' width={40} height={40}/>
        </button>
  </div>
  )
}
export const  getServerSideProps:GetServerSideProps = async ({req}) =>{
  const sesson = await getSession({req});
  return { 
    props: {sesson} 
  };
}