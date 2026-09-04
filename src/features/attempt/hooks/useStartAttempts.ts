import { useMutation } from '@tanstack/react-query';

import { startAttempt } from '../api/attemptApi';

export function useStartAttempt() {
  return useMutation({
    mutationFn: (examId: number) => startAttempt(examId),
  });
}