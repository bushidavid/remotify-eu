import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import LinkedinProvider from "next-auth/providers/linkedin"
import CredentialsProvider from "next-auth/providers/credentials";
import nextAuth from "next-auth";
import supabase from "../../../../../lib/config/supabaseClient";
import bcrypt from 'bcrypt'

export const Options  = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "jsmith@email.com" },
                password: { label: "Password", type: "password" }
              },

            async authorize(credentials, req) {
                console.log("inside authorize");
                if(!credentials.email || !credentials.password){
                    return null;
                }

                const {data: user, error} = await supabase
                    .from('users')
                    .select()
                    .eq('email', credentials.email)

                if(user.email == credentials.email){
                    return null;
                }

                const passwordMatch = bcrypt.compare(credentials.password, "10", user.hashedPassword);

                if(!passwordMatch){
                    return null;
                }
                
                return user[0];
                
            }
        }),
    ],
    secret: process.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    pages: {
        signIn: '/signin',
    },
    strategy: [ 'jwt' ],
    callbacks: {
        async session({ session, token }) {

            const {data: user, error} = await supabase
                    .from('users')
                    .select()
                    .eq('email', token.email)
            

            session.accessToken = token.accessToken;
            session.user.id = token.sub;
            session.user.role = user[0].role;
            
            return session;
          },
          async signIn({ user, account, profile, email, credentials }) {
            return true
          },
          async redirect({ url, baseUrl }) {
            return baseUrl
          }
    },
    // async jwt({ token, user }) {
    //     if (!user) {
    //       return token
    //     }
    
    //     return {
    //       ...token,
    //       ...user
    //     }
    // },
}

const handler = NextAuth(Options);
export { handler as GET, handler as POST};