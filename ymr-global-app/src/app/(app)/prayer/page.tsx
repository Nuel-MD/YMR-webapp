'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Send, Lock, Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PrayerPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [request, setRequest] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Reset and show success
    setIsSubmitting(false)
    setName('')
    setRequest('')
    alert('Prayer request sent successfully! We are standing in faith with you.')
    router.back()
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border/30">
        <div className="flex items-center gap-4 px-4 py-4 max-w-lg mx-auto">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-muted/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Prayer Request</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-6 space-y-6">
        <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">How can we pray for you?</h2>
            <p className="text-muted-foreground">
                "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." - Philippians 4:6
            </p>
        </div>

        <Card className="p-6 border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name (Optional)</Label>
                    <Input 
                        id="name"
                        placeholder="Anonymous" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="request">Your Prayer Request</Label>
                    <Textarea 
                        id="request"
                        placeholder="Share your burden or testimony..." 
                        className="min-h-[150px] resize-none"
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                    <div className="space-y-0.5">
                        <Label className="text-base font-medium">Make Public</Label>
                         <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            {isPublic ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                            {isPublic 
                                ? "Shared with community prayer wall" 
                                : "Kept private (Pastoral team only)"
                            }
                        </div>
                    </div>
                    <Switch 
                        checked={isPublic}
                        onCheckedChange={setIsPublic}
                    />
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold" 
                    disabled={!request || isSubmitting}
                >
                    {isSubmitting ? (
                        "Sending..."
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" /> Send Request
                        </>
                    )}
                </Button>
            </form>
        </Card>
      </div>
    </div>
  )
}
