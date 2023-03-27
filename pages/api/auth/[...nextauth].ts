import nextAuth,{Session} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
const {GOOGLE_CLIENT_ID='',NEXT_PUBLIC_SECRET=''} = process.env; //For avoid type error ->https://stackoverflow.com/questions/73464345/next-auth-providers-with-a-typescript-error
export default nextAuth({
    providers:[
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret:NEXT_PUBLIC_SECRET
          }),

    ],
    callbacks: {//There you can customize your callback return data
        session({ session, token, user }) {
            return session // The return type will match the one returned in `useSession()`
        },
    },
    secret: NEXT_PUBLIC_SECRET,
})
