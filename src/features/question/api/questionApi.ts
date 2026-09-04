import axiosInstance from '../../../services/api/axios';
import type { Question } from '../types/question.types';

export async function getQuestions(
  examId: number
): Promise<Question[]> {
  const response = await axiosInstance.get<Question[]>(
    `/exams/${examId}/questions/`
  );

  return response.data;
}