'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Users, ChevronRight } from 'lucide-react'

// Mock Data
const GROUPS = [
  {
    id: '1',
    name: 'Prayer Warriors',
    members: 1240,
    description: 'A dedicated group for intercessory prayer and spiritual warfare.',
    image: null,
    initials: 'PW'
  },
  {
    id: '2',
    name: 'Bible Study: Romans',
    members: 85,
    description: 'Deep dive into the book of Romans. Meets weekly on Zoom.',
    image: null,
    initials: 'BS'
  },
  {
    id: '3',
    name: 'Worship Leaders',
    members: 432,
    description: 'Community for worship leaders to share songs, tips, and encouragement.',
    image: null,
    initials: 'WL'
  },
  {
    id: '4',
    name: 'Youth Pastors Network',
    members: 210,
    description: 'Connecting youth pastors globally for support and resource sharing.',
    image: null,
    initials: 'YP'
  }
]

export function GroupsView() {
  return (
    <div className="space-y-4 pb-20">
      {/* Create Group CTA */}
      <Card className="p-6 bg-primary/10 border-primary/20 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Start a New Group</h3>
          <p className="text-sm text-muted-foreground">Gather people around a shared purpose.</p>
        </div>
        <Button>Create</Button>
      </Card>

      <div className="flex items-center justify-between px-1">
        <h2 className="font-semibold text-lg">Suggested Groups</h2>
        <Button variant="link" className="text-primary h-auto p-0">See All</Button>
      </div>

      {/* Groups List */}
      <div className="grid gap-4">
        {GROUPS.map(group => (
          <Card key={group.id} className="p-5 flex items-center gap-4 border-2 border-border/40 shadow-md hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer">
            <Avatar className="h-14 w-14 rounded-lg">
              <AvatarImage src={group.image || ''} />
              <AvatarFallback className="rounded-lg bg-primary/20 text-primary font-bold">
                {group.initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base truncate">{group.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Users className="h-3 w-3" />
                <span>{group.members.toLocaleString()} members</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mt-2">
                {group.description}
              </p>
            </div>

            <Button variant="outline" size="sm" className="shrink-0 border-2 hover:bg-primary hover:text-white">
              Join
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
