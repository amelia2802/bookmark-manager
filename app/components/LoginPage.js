'use client'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage({className, children}) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return( 
    <button className={className} onClick={handleLogin}>
      {children || "Sign in with Google"}
    </button>
  )
}