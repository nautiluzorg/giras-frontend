export interface QuestionOption {
  id: number;
  option_text: string;
  order: number;
}

export interface Question {
  id: number;
  question_text: string;
  order: number;
  options: QuestionOption[];
}