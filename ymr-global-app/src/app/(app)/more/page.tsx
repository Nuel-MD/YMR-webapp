'use client'

import { 
  BookOpen, 
  Video, 
  Heart, 
  Calendar, 
  Users2, 
  Settings, 
  LogOut, 
  ChevronRight,
  UserCircle,
  Gift
} from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function MorePage() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">More</h1>

        <div className="space-y-6">
          {/* Spiritual Growth Section */}
          <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 pl-2">
              Spiritual Growth
            </h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <MenuItem 
                href="/bible" 
                icon={BookOpen} 
                label="Bible" 
                description="Read and study scripture"
              />
              <MenuItem 
                href="/sermons" 
                icon={Video} 
                label="Sermons" 
                description="Watch past messages"
              />
              {/* <MenuItem 
                href="/devotionals" 
                icon={Heart} 
                label="Devotionals" 
                description="Daily spiritual nourishment"
              /> */}
            </div>
          </section>

          {/* Community Section */}
          <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 pl-2">
              Community
            </h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <MenuItem 
                href="/hub" 
                icon={Users2} 
                label="Community Hub" 
                description="Connect with groups"
              />
              <MenuItem 
                href="/events" 
                icon={Calendar} 
                label="Events" 
                description="Upcoming gatherings"
              />
              <MenuItem 
                href="/giving" 
                icon={Gift} 
                label="Giving" 
                description="Support the ministry"
              />
            </div>
          </section>

          {/* Account Section */}
          <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 pl-2">
              Account
            </h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <MenuItem 
                href="/profile" 
                icon={UserCircle} 
                label="Profile" 
              />
              <MenuItem 
                href="/settings" 
                icon={Settings} 
                label="Settings" 
              />
            </div>
          </section>

          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}

function MenuItem({ 
  href, 
  icon: Icon, 
  label, 
  description 
}: { 
  href: string
  icon: React.ElementType
  label: string
  description?: string
}) {
  return (
    <Link 
      href={href}
      className="flex items-center justify-between p-4 hover:bg-accent transition-colors border-b border-border last:border-0"
    >
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="font-medium text-foreground">{label}</div>
          {description && (
            <div className="text-xs text-muted-foreground">{description}</div>
          )}
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Link>
  )
}
