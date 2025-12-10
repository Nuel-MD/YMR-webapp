'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'
import { User as UserIcon } from 'lucide-react'

interface User {
  id: string
  full_name: string
  avatar_url?: string
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser) {
        setUser({
          id: authUser.id,
          full_name: authUser.user_metadata.full_name || authUser.email?.split('@')[0] || 'Friend',
          avatar_url: authUser.user_metadata.avatar_url
        })
      }
    }

    loadUser()
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b-gray-600">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <Image
              src="/images/YMR-LOGO-NEW.png"
              alt="YMR Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline-block">
            YMR Global
          </span>
        </Link>

        {/* Profile */}
        <Link href="/profile">
          {user?.avatar_url ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border">
              <Image
                src={user.avatar_url}
                alt={user.full_name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <UserIcon className="h-5 w-5" />
            </div>
          )}
        </Link>
      </div>
    </header>
  )
}
