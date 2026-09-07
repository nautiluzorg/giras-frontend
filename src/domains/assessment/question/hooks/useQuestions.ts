import { useQuery } from '@tanstack/react-query';

import { getQuestions } from '../api/questionApi';

export function useQuestions(examId: number) {
  return useQuery({
    queryKey: ['questions', examId],
    queryFn: () => getQuestions(examId),
    enabled: !!examId,
  });
}