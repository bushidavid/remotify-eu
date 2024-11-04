import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken"
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin"
import CredentialsProvider from "next-auth/providers/credentials";
import supabase from "../../../../../lib/config/supabaseClient";
import bcrypt from 'bcrypt';

export const Options  = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        }),
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "jsmith@email.com" },
                password: { label: "Password", type: "password" }
              },

            async authorize(credentials, req) {
                if(!credentials.email || !credentials.password){
                    return null;
                }

                const {data: user, error} = await supabase
                    .from('users')
                    .select()
                    .eq('email', credentials.email)


                if (error || !user) {
                    console.log("User not found or error occurred:", error);
                    return null;
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user[0].password);

                if(!passwordMatch){
                    return null;
                }
                
                return user[0];
                
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    // jwt: {
    //     // if you definde the env variable you don't need to define the secret here
    //     // secret: process.env.NEXTAUTH_SECRET,

    //     // maxAge: 30 * 24 * 60 * 60, // 30 days

    //     async jwt({ token, user }) {

    //         console.log(token);

    //         if (user) {
    //             token.role = user.role;
    //         }
    //         console.log("JWT Callback - Token:", token);
    //         return token;
    //     }

    //     // You only need the below if you are custom signing your JWTs
    //     // async encode({ token, secret }: { token: typeof JWT; secret: string }) {
    //     //     const jwt = require("jsonwebtoken");
    //     //     const encodedToken = jwt.sign(token, secret);
    //     //     return encodedToken;
    //     // },
    //     // async decode({ token, secret }: { token: typeof JWT; secret: string }) {
    //     //     const jwt = require("jsonwebtoken");
    //     //     const decodedToken = jwt.verify(token, secret);
    //     //     return decodedToken;
    //     // },

    // },
    callbacks: {
        async session({ session, token }) {

            session.user.role = token.role;
            session.user.id = token.id;
            console.log("Session Callback - Session:", session);
            return session;


        //     const {data: user, error} = await supabase
        //             .from('users')
        //             .select()
        //             .eq('email', token.email)
            

        //     session.accessToken = token.accessToken;
        //     session.user.id = token.sub;
        //     session.user.role = user[0].role;
            
        //     return session;
        //   },
        //   async signIn({ user, account, profile, email, credentials }) {
        //     return true
          },
        //   async redirect({ url, baseUrl }) {
        //     return baseUrl
        //   },
        async jwt({ token, user, account }) {
            console.log("JWT Callback - Token before assignment:", token);

            if (user) {
                // Add role and user id to token
                token.role = user.role;
                token.id = user.id;
                token.image = user.picture
            }

            if (account) {
                // Persist OAuth access token to the token
                token.accessToken = account.access_token;
            }

            console.log("JWT Callback - Token after assignment:", token);
            return token;
        },
    },    
}

const handler = NextAuth(Options);
export { handler as GET, handler as POST};