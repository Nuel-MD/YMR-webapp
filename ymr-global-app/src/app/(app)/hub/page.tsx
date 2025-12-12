'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FeedView } from '@/components/community/feed-view'
import { GroupsView } from '@/components/community/groups-view'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function HubPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
        <div className="p-4 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Community</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-border rounded-none px-4">
          <TabsTrigger 
            value="feed" 
            className="rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium data-[state=active]:border-b-[#277C28]! data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Feed
          </TabsTrigger>
          <TabsTrigger 
            value="groups" 
            className="rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium data-[state=active]:border-b-[#277C28]! data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Groups
          </TabsTrigger>
          </TabsList>

          <div className="p-4">
            <TabsContent value="feed" className="m-0">
              <FeedView />
            </TabsContent>
            <TabsContent value="groups" className="m-0">
              <GroupsView />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
