import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar';
import {FormValidationContext} from '../contexts/FormValidationContext';
export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <NavBar/>
      <FormValidationContext>
        <Component {...pageProps} />
      </FormValidationContext>
    </>
    ) 
}
