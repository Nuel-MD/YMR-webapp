'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { House, Compass, BookOpenText, TableOfContents } from 'lucide-react'
import Link from 'next/link'

import Header from '@/components/layout/Header'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth/login')
      } else {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex items-center justify-around px-6 py-3">
          <NavItem href="/home" icon={House} label="Home" />
          <NavItem href="/bible" icon={BookOpenText} label="Bible" />
          <NavItem href="/discover" icon={Compass} label="Discover" />
          <NavItem href="/more" icon={TableOfContents} label="More" />
        </div>
      </nav>
    </div>
  )
}

function NavItem({ 
  href, 
  icon: Icon, 
  label 
}: { 
  href: string
  icon: React.ElementType
  label: string
}) {
  return (
    <Link 
      href={href}
      className="flex flex-col items-center justify-center space-y-1 min-w-[60px] py-2 px-3 rounded-lg transition-colors group"
    >
      <Icon className="h-6 w-6 text-white group-hover:text-green-500 transition-colors" strokeWidth={2} />
      <span className="text-xs font-medium text-white group-hover:text-green-500 transition-colors">{label}</span>
    </Link>
  )
}
