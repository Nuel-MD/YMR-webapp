'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Moon, Bell, Shield, HelpCircle, ChevronRight, Monitor } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator'; // Assuming this exists, if not I'll just use a div
// If Separator doesn't exist, I'll remove it or create a simple border div. I'll assume standard components exist or basic divs.

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center px-4 h-14">
          <Button 
            variant="ghost" 
            size="icon" 
            className="-ml-2 mr-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-lg">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        
        {/* Appearance Section */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Appearance
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border last:border-0">
               <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Moon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Dark Mode</div>
                    <div className="text-xs text-muted-foreground">Adjust display theme</div>
                  </div>
               </div>
               <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Notifications
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
               <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-xs text-muted-foreground">Receive updates on your device</div>
                  </div>
               </div>
               <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
             <SettingsLink 
                icon={Bell} 
                label="Email Preferences" 
                colorClass="text-blue-500 bg-blue-500/10"
             />
          </div>
        </section>

        {/* Legal & Support */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Support & Legal
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
             <SettingsLink 
                icon={HelpCircle} 
                label="Help & Support" 
                colorClass="text-green-500 bg-green-500/10"
             />
             <SettingsLink 
                icon={Shield} 
                label="Privacy Policy" 
                colorClass="text-orange-500 bg-orange-500/10"
             />
             <SettingsLink 
                icon={Shield} 
                label="Terms of Service" 
                colorClass="text-orange-500 bg-orange-500/10"
             />
          </div>
        </section>
        
        <div className="text-center text-xs text-muted-foreground py-4">
            Version 1.0.0
        </div>

      </div>
    </div>
  );
}

function SettingsLink({ 
    icon: Icon, 
    label, 
    colorClass = "text-foreground bg-accent"
}: { 
    icon: any, 
    label: string,
    colorClass?: string
}) {
    return (
        <button className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors border-b border-border last:border-0 text-left">
            <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                </div>
                <div className="font-medium">{label}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
    )
}
