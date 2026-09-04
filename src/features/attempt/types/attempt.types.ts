export interface Attempt {
  id: number;
  exam: number;
  participant_id: number | null;
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'EXPIRED';
  started_at: string;
  finished_at: string | null;
}