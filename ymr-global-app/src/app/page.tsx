'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

export default function SplashPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      // Simulate splash screen delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (session) {
        // User is logged in, go to home
        router.push('/home')
      } else {
        // Always show onboarding for non-logged-in users
        router.push('/onboarding')
      }
    }

    checkAuth()
  }, [router])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#003930]">
      <div className="flex justify-center items-center ">
        {/* YMR Logo */}
        <div className="relative h-52 w-52 animate-pulse">
          <Image
            src="/images/YMR-LOGO-NEW.png"
            alt="Young Ministers Retreat Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
       
      </div>
    </div>
  )
}
