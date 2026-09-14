import { create } from 'zustand';

interface AttemptState {
  // ========================================
  // NAVIGATION
  // ========================================

  currentPage: number;

  currentQuestionIndex: number;

  questionsPerPage: number;

  // ========================================
  // ANSWERS
  // ========================================

  answers: Record<number, number>;

  // ========================================
  // MARK FOR REVIEW
  // ========================================

  markedForReview: Record<
    number,
    boolean
  >;

  // ========================================
  // NAVIGATION ACTIONS
  // ========================================

  setCurrentPage: (page: number) => void;

  setCurrentQuestionIndex: (
    index: number
  ) => void;

  goToQuestion: (
    questionIndex: number
  ) => void;

  setQuestionsPerPage: (
    count: number
  ) => void;

  nextPage: (
    totalQuestions: number
  ) => void;

  previousPage: () => void;

  nextQuestion: (
    totalQuestions: number
  ) => void;

  previousQuestion: () => void;

  // ========================================
  // ANSWER ACTION
  // ========================================

  setAnswer: (
    questionId: number,
    optionId: number
  ) => void;

  // ========================================
  // REVIEW ACTION
  // ========================================

  toggleMarkForReview: (
    questionId: number
  ) => void;

  // ========================================
  // QUESTION STATUS
  // ========================================

  isQuestionAnswered: (
    questionId: number
  ) => boolean;

  isQuestionMarkedForReview: (
    questionId: number
  ) => boolean;

  getAnsweredCount: () => number;

  getMarkedForReviewCount: () => number;
}

export const useAttemptStore =
  create<AttemptState>(
    (set, get) => ({

      // ========================================
      // INITIAL STATE
      // ========================================

      currentPage: 0,

      currentQuestionIndex: 0,

      questionsPerPage: 5,

      answers: {},

      markedForReview: {},

      // ========================================
      // SET CURRENT PAGE
      // ========================================

      setCurrentPage: (page) =>
        set((state) => ({
          currentPage: page,

          currentQuestionIndex:
            page *
            state.questionsPerPage,
        })),

      // ========================================
      // SET CURRENT QUESTION INDEX
      // ========================================

      setCurrentQuestionIndex: (
        index
      ) =>
        set((state) => ({
          currentQuestionIndex:
            index,

          currentPage:
            Math.floor(
              index /
                state.questionsPerPage
            ),
        })),

      // ========================================
      // GO TO QUESTION
      // ========================================

      goToQuestion: (
        questionIndex
      ) =>
        set((state) => ({
          currentQuestionIndex:
            questionIndex,

          currentPage:
            Math.floor(
              questionIndex /
                state.questionsPerPage
            ),
        })),

      // ========================================
      // SET QUESTIONS PER PAGE
      // ========================================

      setQuestionsPerPage: (
        count
      ) =>
        set({
          questionsPerPage: count,

          currentPage: 0,

          currentQuestionIndex: 0,
        }),

      // ========================================
      // NEXT PAGE
      // ========================================

      nextPage: (
        totalQuestions
      ) =>
        set((state) => {
          const totalPages =
            Math.ceil(
              totalQuestions /
                state.questionsPerPage
            );

          if (
            state.currentPage >=
            totalPages - 1
          ) {
            return state;
          }

          const nextPage =
            state.currentPage + 1;

          return {
            currentPage:
              nextPage,

            currentQuestionIndex:
              nextPage *
              state.questionsPerPage,
          };
        }),

      // ========================================
      // PREVIOUS PAGE
      // ========================================

      previousPage: () =>
        set((state) => {
          if (
            state.currentPage === 0
          ) {
            return state;
          }

          const previousPage =
            state.currentPage - 1;

          return {
            currentPage:
              previousPage,

            currentQuestionIndex:
              previousPage *
              state.questionsPerPage,
          };
        }),

      // ========================================
      // NEXT QUESTION
      // ========================================

      nextQuestion: (
        totalQuestions
      ) =>
        set((state) => {

          // ==================================
          // LAST QUESTION
          // ==================================

          if (
            state.currentQuestionIndex >=
            totalQuestions - 1
          ) {
            return state;
          }

          // ==================================
          // NEXT QUESTION INDEX
          // ==================================

          const nextQuestionIndex =
            state.currentQuestionIndex + 1;

          // ==================================
          // CALCULATE PAGE
          // ==================================

          const nextPage =
            Math.floor(
              nextQuestionIndex /
                state.questionsPerPage
            );

          return {
            currentQuestionIndex:
              nextQuestionIndex,

            currentPage:
              nextPage,
          };
        }),

      // ========================================
      // PREVIOUS QUESTION
      // ========================================

      previousQuestion: () =>
        set((state) => {

          // ==================================
          // FIRST QUESTION
          // ==================================

          if (
            state.currentQuestionIndex === 0
          ) {
            return state;
          }

          // ==================================
          // PREVIOUS QUESTION INDEX
          // ==================================

          const previousQuestionIndex =
            state.currentQuestionIndex - 1;

          // ==================================
          // CALCULATE PAGE
          // ==================================

          const previousPage =
            Math.floor(
              previousQuestionIndex /
                state.questionsPerPage
            );

          return {
            currentQuestionIndex:
              previousQuestionIndex,

            currentPage:
              previousPage,
          };
        }),

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

            [questionId]:
              optionId,
          },
        })),

      // ========================================
      // TOGGLE MARK FOR REVIEW
      // ========================================

      toggleMarkForReview: (
        questionId
      ) =>
        set((state) => {
          const isMarked =
            state.markedForReview[
              questionId
            ] === true;

          const updatedMarks = {
            ...state.markedForReview,
          };

          if (isMarked) {
            delete updatedMarks[
              questionId
            ];
          } else {
            updatedMarks[
              questionId
            ] = true;
          }

          return {
            markedForReview:
              updatedMarks,
          };
        }),

      // ========================================
      // IS QUESTION ANSWERED
      // ========================================

      isQuestionAnswered: (
        questionId
      ) => {
        return (
          get().answers[
            questionId
          ] !== undefined
        );
      },

      // ========================================
      // IS QUESTION MARKED
      // ========================================

      isQuestionMarkedForReview: (
        questionId
      ) => {
        return (
          get().markedForReview[
            questionId
          ] === true
        );
      },

      // ========================================
      // GET ANSWERED COUNT
      // ========================================

      getAnsweredCount: () => {
        return Object.keys(
          get().answers
        ).length;
      },

      // ========================================
      // GET MARKED COUNT
      // ========================================

      getMarkedForReviewCount: () => {
        return Object.keys(
          get().markedForReview
        ).length;
      },

    })
  );