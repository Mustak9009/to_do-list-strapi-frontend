import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {FormValidationContext} from '../contexts/FormValidationContext';
import {SessionProvider} from 'next-auth/react';
import Login from '@/components/login';

export default function App({ Component, pageProps:{session,...pageProps} }: AppProps) {
  return(
    <>
      <SessionProvider>
      <Login/>
      <FormValidationContext>
          <Component {...pageProps} session={session}/>
      </FormValidationContext>
      </SessionProvider>
    </>
    ) 
}
