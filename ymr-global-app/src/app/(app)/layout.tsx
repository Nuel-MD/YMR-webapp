'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { House, Compass, BookOpenText, TableOfContents } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLayoutStore } from '@/lib/store'

import Header from '@/components/layout/Header'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const { isHeaderVisible, isBottomNavVisible } = useLayoutStore()

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
      <div className={cn("transition-all duration-300 ease-in-out", isHeaderVisible ? "translate-y-0" : "-translate-y-full absolute w-full z-40")}>
        <Header />
      </div>
      
      {/* Main Content */}
      <main className={cn("flex-1 overflow-y-auto transition-all duration-300", isBottomNavVisible ? "pb-20" : "pb-0")}>
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border transition-transform duration-300 ease-in-out",
        isBottomNavVisible ? "translate-y-0" : "translate-y-full"
      )}>
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
  const pathname = usePathname()
  
  const isActive = pathname.startsWith(href)
  
  return (
    <Link 
      href={href}
      className={cn(
        "flex flex-col items-center justify-center space-y-1 min-w-[60px] py-2 px-3 rounded-lg transition-all active:scale-95 touch-manipulation",
        isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
      )}
    >
      <Icon 
        className={cn(
          "h-6 w-6 transition-colors",
          isActive ? " stroke-current" : "text-muted-foreground group-hover:text-primary"
        )} 
        strokeWidth={isActive ? 2.5 : 2} 
      />
      <span 
        className={cn(
          "text-xs font-medium transition-colors",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
        )}
      >
        {label}
      </span>
    </Link>
  )
}
