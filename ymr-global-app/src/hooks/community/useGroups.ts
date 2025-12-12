import { createClient } from '@/lib/supabase/client';
import { Group } from '@/types/community';
import { useQuery } from '@tanstack/react-query';
import { MOCK_GROUPS } from '@/lib/mockData/community';

const USE_MOCK_DATA = true;

export function useGroups() {
  const supabase = createClient();

  const { data: groups, isLoading, error } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_GROUPS;
      }

      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .order('member_count', { ascending: false });
      
      if (error) throw error;
      return data as Group[];
    },
  });

  return { groups, isLoading, error };
}
