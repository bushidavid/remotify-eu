import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken"
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin"
import CredentialsProvider from "next-auth/providers/credentials";
import supabase from "../../../../../lib/config/supabaseClient";
import bcrypt from 'bcrypt';
import { parse } from 'cookie';

export const Options  =  {
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
    adapter: SupabaseAdapter({
        url: process.env.SUPABASE_URL,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
      }),
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
            const signingSecret = process.env.SUPABASE_JWT_SECRET;
        
            // For Google and LinkedIn providers
            if (token.provider === "google" || token.provider === "linkedin") {
                if (signingSecret) {
                    const payload = {
                        aud: "authenticated",
                        exp: Math.floor(new Date(session.expires).getTime() / 1000),
                        sub: token.id,         // Access user ID from token
                        email: token.email,    // Access email from token
                        role: token.role || "authenticated",
                    };
                    session.supabaseAccessToken = jwt.sign(payload, signingSecret);
                }
            } else if (token.provider === "credentials") {
                // For credentials provider
                session.user.role = token.role;
                session.user.id = token.id;
            }
        
            return session;
        },

        async  jwt({ token, user, account }) {

            console.log("inside jwt");
            console.log("logging user: ", user);
            console.log("logging account: ", account);
            if (user) {
                // Store user data in the token when the user first signs in
                token.id = user.id;
                token.email = user.email;
                token.role = user.role || null; // Default role if not specified
            }
    
        
            return token;
        },
    },
    events: {
        async createUser({ user }) {

            const userTypeCookie = req.cookies._parsed.get('userType');
            const userType = userTypeCookie ? userTypeCookie.value : null;

            if (userType) {
                try {
                    const { error } = await supabase
                        .from('users')
                        .update({ role: userType })
                        .eq('id', user.id);

                    if (error) {
                        console.log("Error updating user role", error);
                        return false;
                    }

                } catch (error) {
                    console.log(error);
                    return false;
                }
            }
        }
    }
}

const handler = NextAuth(Options);
export { handler as GET, handler as POST};