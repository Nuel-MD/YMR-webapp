import { Group } from '@/types/community';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Search, Share2, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface GroupHeaderProps {
  group: Group;
}

export function GroupHeader({ group }: GroupHeaderProps) {
  const router = useRouter();
  const [isMember, setIsMember] = useState(group.is_member);

  return (
    <div className="bg-background w-full">
         {/* Cover Image */}
         <div className="relative h-[200px] md:h-[300px] w-full bg-muted overflow-hidden">
            {group.image_url ? (
                <img src={group.image_url} alt={group.name} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
            )}
             <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 left-4 bg-background/50 hover:bg-background/80 rounded-full backdrop-blur-sm z-10"
                onClick={() => router.back()}
            >
                <ArrowLeft className="h-5 w-5 text-foreground" />
            </Button>
         </div>

         {/* Info Section */}
         <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="py-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                     {/* Group Details */}
                     <div className="flex flex-col gap-2">
                         <h1 className="text-2xl md:text-3xl font-bold text-foreground">{group.name}</h1>
                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Private Group</span>
                            <span>•</span>
                            <span className="flex items-center">
                                {group.member_count || 0} members
                            </span>
                         </div>
                     </div>
                     
                     {/* Actions */}
                     <div className="flex items-center gap-2 mt-4 md:mt-0">
                         {/* Join/Joined Button */}
                        <div className="mr-2">
                            {isMember ? (
                                <Button 
                                    variant="outline" 
                                    className="border-primary text-primary hover:bg-primary/10"
                                    onClick={() => setIsMember(false)}
                                >
                                    Joined
                                </Button>
                            ) : (
                                <Button 
                                    className="bg-[#277C28] text-white hover:bg-[#277C28]/90"
                                    onClick={() => setIsMember(true)}
                                >
                                    Join Group
                                </Button>
                            )}
                        </div>

                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                            <Search className="h-5 w-5" />
                        </Button>
                        <div className="h-6 w-px bg-border mx-1" />
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                            <Share2 className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                             <MoreHorizontal className="h-5 w-5" />
                        </Button>
                     </div>
                </div>
                
                {group.description && (
                    <p className="mt-4 text-muted-foreground max-w-3xl">
                        {group.description}
                    </p>
                )}
            </div>
         </div>
    </div>
  );
}
