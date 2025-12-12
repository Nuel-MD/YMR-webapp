import { Group } from '@/types/community';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Link href={`/hub/groups/${group.id}`}>
        <Card className="px-4 overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full flex flex-col border-2 border-border/40 group gap-0">
        <div className="h-32 bg-none relative overflow-hidden ">
            {group.image_url ? (
                <img src={group.image_url} alt={group.name} className="w-full h-full rounded-[12px] object-cover " />
            ) : (
                <div className="w-full h-full" />
            )}
            <div className="absolute rounded-[12px] inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                <span className="text-white text-xs font-medium bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                    {group.member_count?.toLocaleString() || 0} Members
                </span>
            </div>
        </div>
        <CardHeader className="px-0 py-4">
            <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors">{group.name}</h3>
        </CardHeader>
        <CardContent className="px-0 pt-2 flex-1">
            <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
        </CardContent>
        <CardFooter className="py-4  mt-auto flex justify-center">
            <Button className="min-w-[200px]">
                {group.is_member ? 'View Group' : 'Join Group'}
            </Button>
        </CardFooter>
        </Card>
    </Link>
  );
}
