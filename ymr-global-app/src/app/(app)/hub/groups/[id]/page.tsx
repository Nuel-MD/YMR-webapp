import { GroupPageClient } from '@/components/community/Groups/GroupPageClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HubGroupPage({ params }: PageProps) {
  const { id } = await params;
  return <GroupPageClient groupId={id} />;
}
