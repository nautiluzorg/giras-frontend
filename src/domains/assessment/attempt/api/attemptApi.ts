import api from '@/core/api/axios';

import type { Attempt } from '../types/attempt.types';

export async function getAttempt(
  attemptId: number
): Promise<Attempt> {

  const response = await api.get<Attempt>(
    `/attempts/${attemptId}/`
  );

  return response.data;
}


export async function startAttempt(
  examId: number
): Promise<Attempt> {

  const response = await api.post<Attempt>(
    `/attempts/exams/${examId}/start/`
  );

  return response.data;
}