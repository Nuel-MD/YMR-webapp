import { createClient } from '@/lib/supabase/client';
import { Group } from '@/types/community';
import { useQuery } from '@tanstack/react-query';
import { MOCK_GROUPS } from '@/lib/mockData/community';

const USE_MOCK_DATA = true;

export function useGroup(groupId: string) {
  const supabase = createClient();

  const { data: group, isLoading, error } = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const foundGroup = MOCK_GROUPS.find(g => g.id === groupId);
        if (!foundGroup) {
            throw new Error('Group not found');
        }
        return foundGroup;
      }

      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('id', groupId)
        .single();

      if (error) {
        throw error;
      }
      return data as Group;
    },
    enabled: !!groupId,
  });

  return {
    group,
    isLoading,
    error
  };
}
