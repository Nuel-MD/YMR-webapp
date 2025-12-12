import { useGroups } from '@/hooks/community/useGroups';
import { GroupCard } from './GroupCard';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GroupsList() {
    const { groups, isLoading, error } = useGroups();

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-destructive">
                Failed to load groups.
            </div>
        );
    }

    if (!groups || groups.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                 No groups found.
            </div>
        );
    }

    return (
        <div className="space-y-4 py-4">
    
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {groups.map(group => (
                    <GroupCard key={group.id} group={group} />
                ))}
            </div>
        </div>
    );
}
