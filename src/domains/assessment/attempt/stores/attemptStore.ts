import { create } from 'zustand';

interface AttemptState {
  // ========================================
  // PAGINATION
  // ========================================

  currentPage: number;

  questionsPerPage: number;

  // ========================================
  // ANSWERS
  // ========================================

  answers: Record<number, number>;

  // ========================================
  // PAGINATION ACTIONS
  // ========================================

  setCurrentPage: (page: number) => void;

  setQuestionsPerPage: (count: number) => void;

  nextPage: (totalQuestions: number) => void;

  previousPage: () => void;

  // ========================================
  // ANSWER ACTION
  // ========================================

  setAnswer: (
    questionId: number,
    optionId: number
  ) => void;
}

export const useAttemptStore =
  create<AttemptState>((set) => ({
    // ========================================
    // INITIAL STATE
    // ========================================

    currentPage: 0,

    questionsPerPage: 5,

    answers: {},

    // ========================================
    // SET CURRENT PAGE
    // ========================================

    setCurrentPage: (page) =>
      set({
        currentPage: page,
      }),

    // ========================================
    // SET QUESTIONS PER PAGE
    // ========================================

    setQuestionsPerPage: (count) =>
      set({
        questionsPerPage: count,
        currentPage: 0,
      }),

    // ========================================
    // NEXT PAGE
    // ========================================

    nextPage: (totalQuestions) =>
      set((state) => {
        const totalPages = Math.ceil(
          totalQuestions /
            state.questionsPerPage
        );

        return {
          currentPage:
            state.currentPage <
            totalPages - 1
              ? state.currentPage + 1
              : state.currentPage,
        };
      }),

    // ========================================
    // PREVIOUS PAGE
    // ========================================

    previousPage: () =>
      set((state) => ({
        currentPage:
          state.currentPage > 0
            ? state.currentPage - 1
            : 0,
      })),

    // ========================================
    // SET ANSWER
    // ========================================

    setAnswer: (
      questionId,
      optionId
    ) =>
      set((state) => ({
        answers: {
          ...state.answers,
          [questionId]: optionId,
        },
      })),
  }));