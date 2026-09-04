import { useQuery } from '@tanstack/react-query';

import { getAttempt } from '../api/attemptApi';

export function useAttempt(attemptId: number) {

  return useQuery({
    queryKey: ['attempt', attemptId],

    queryFn: () => getAttempt(attemptId),

    enabled: Number.isFinite(attemptId),
  });
}