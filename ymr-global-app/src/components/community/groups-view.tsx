'use client'

import { GroupsList } from './Groups/GroupsList'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function GroupsView() {
  return (
    <div className="space-y-4 pb-20">
      {/* Create Group CTA */}
      <Card className="p-6 bg-primary/10 border-primary/20 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Start a New Group</h3>
          <p className="text-sm text-muted-foreground">Gather people around a shared purpose.</p>
        </div>
        <Button onClick={() => alert("Create Group feature coming soon!")}>Create</Button>
      </Card>

      <div className="flex items-center justify-between px-1">
        <h2 className="font-semibold text-lg">Suggested Groups</h2>
      </div>

      {/* Groups List */}
      <GroupsList />
    </div>
  )
}
