import api from '@/core/api/axios';
import type { Exam } from '../types/exam.types';


export async function getExams(): Promise<Exam[]> {
  const response = await api.get<Exam[]>('/exams/');

  return response.data;
}


export const getExamById = async (id: number): Promise<Exam> => {
  const response = await api.get(`/exams/${id}/`);

  return response.data;
};