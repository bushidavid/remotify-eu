import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import supabase from "../../../../../lib/config/supabaseClient";
import bcrypt from 'bcrypt';
import { parse } from 'cookie';

function nextAuthOptions(req, res) {
    return {
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
                async authorize(credentials) {
                    if (!credentials.email || !credentials.password) {
                        return null;
                    }
                    const { data: user, error } = await supabase
                        .from('users')
                        .select()
                        .eq('email', credentials.email);

                    if (error || !user) {
                        console.log("User not found or error occurred:", error);
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(credentials.password, user[0].password);

                    if (!passwordMatch) {
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
        callbacks: {
            async session({ session, token }) {
                const signingSecret = process.env.SUPABASE_JWT_SECRET;

                if (token.provider === "google" || token.provider === "linkedin") {
                    if (signingSecret) {
                        const payload = {
                            aud: "authenticated",
                            exp: Math.floor(new Date(session.expires).getTime() / 1000),
                            sub: token.id,
                            email: token.email,
                            role: token.role || "authenticated",
                        };
                        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
                    }
                } else if (token.provider === "credentials") {
                    session.user.role = token.role;
                    session.user.id = token.id;
                }

                session.user.userType = token.userType;
                return session;
            },
            async jwt({ token, user, account }) {
                if (user) {
                    token.id = user.id;
                    token.email = user.email;
                    token.role = user.role || null;
                }


                return token;
            },
        },
        events: {
            async createUser({ user }) {
                try {
                    // Retrieve userType from cookies
                    console.log("logging cookies" ,req.cookies)
                    const userTypeCookie = req.cookies._parsed.get('userType');
                    const userType = userTypeCookie ? userTypeCookie.value : null;

                    console.log("User Type from Cookie:", userType); 

                    if (userType) {
                        // Update the `role` column in the users table
                        const { error } = await supabase
                            .from('users')
                            .update({ role: userType })
                            .eq('id', user.id);

                        if (error) {
                            console.error("Error updating user role:", error);
                            return false;
                        }
                    }
                } catch (error) {
                    console.error("Error in createUser event:", error);
                    return false;
                }
            }
        }
    };
}

// Define a named handler function
export function auth(req, res) {
    return NextAuth(req, res, nextAuthOptions(req, res));
}

// Export as GET and POST handlers
export const GET = auth;
export const POST = auth;