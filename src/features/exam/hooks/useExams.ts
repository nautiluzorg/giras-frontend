import { useQuery } from '@tanstack/react-query';

import { getExams } from '../api/examApi';

export function useExams() {
  return useQuery({
    queryKey: ['exams'],
    queryFn: getExams,
  });
}