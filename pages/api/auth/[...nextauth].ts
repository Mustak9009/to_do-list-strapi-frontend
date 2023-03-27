import nextAuth,{Session} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
const { v4: uuidv4 } = require('uuid');
const {GOOGLE_CLIENT_ID='',GOOGLE_CLIENT_SECRET=''} = process.env; //For avoid type error ->https://stackoverflow.com/questions/73464345/next-auth-providers-with-a-typescript-error
const secret = uuidv4();
export default nextAuth({
    providers:[
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret:secret
          }),

    ],
    callbacks: {//There you can customize your callback return data
        session({ session, token, user }) {
            return session // The return type will match the one returned in `useSession()`
        },
    },
})
