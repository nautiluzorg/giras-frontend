import { useQuery } from '@tanstack/react-query';

import { getExamById } from '../api/examApi';

export const useExam = (id: number) => {
  return useQuery({
    queryKey: ['exam', id],
    queryFn: () => getExamById(id),
  });
};