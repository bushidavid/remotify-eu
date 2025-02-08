import { createServerClient, CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {

  const cookieStore = cookies();

  //console.log("logging cookies: ", cookieStore);

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              console.log("logging cookie to set: ");
              console.log("name: ", name);
              console.log("value: ", value);
              console.log("options", options);  

              cookieStore.set(name, value, options);
              }
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}