'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Camera, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [fullName, setFullName] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const getProfile = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user)
        setFullName(user.user_metadata.full_name || '')
      }
      setLoading(false)
    }

    getProfile()
  }, [])

  const handleUpdateProfile = async () => {
    setSaving(true)
    const supabase = createClient()
    
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    })

    if (!error) {
      // Show success toast (mock)
      alert('Profile updated successfully!')
    }
    setSaving(false)
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {fullName?.charAt(0) || user?.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <h2 className="text-xl font-bold">{fullName || 'User'}</h2>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
            />
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input 
              value={user?.email} 
              disabled 
              className="bg-muted text-muted-foreground"
            />
          </div>

          <Button 
            onClick={handleUpdateProfile} 
            disabled={saving}
            className="w-full"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </Card>

        <Button 
          variant="outline" 
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
