import { create } from 'zustand';

interface AttemptState {
  currentQuestionIndex: number;

  answers: Record<number, number>;

  setCurrentQuestionIndex: (index: number) => void;

  nextQuestion: (totalQuestions: number) => void;

  previousQuestion: () => void;

  setAnswer: (
    questionId: number,
    optionId: number
  ) => void;
}

export const useAttemptStore = create<AttemptState>(
  (set) => ({
    currentQuestionIndex: 0,

    answers: {},

    setCurrentQuestionIndex: (index) =>
      set({
        currentQuestionIndex: index,
      }),

    nextQuestion: (totalQuestions) =>
      set((state) => ({
        currentQuestionIndex:
          state.currentQuestionIndex <
          totalQuestions - 1
            ? state.currentQuestionIndex + 1
            : state.currentQuestionIndex,
      })),

    previousQuestion: () =>
      set((state) => ({
        currentQuestionIndex:
          state.currentQuestionIndex > 0
            ? state.currentQuestionIndex - 1
            : 0,
      })),

    setAnswer: (questionId, optionId) =>
      set((state) => ({
        answers: {
          ...state.answers,
          [questionId]: optionId,
        },
      })),
  })
);