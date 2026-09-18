import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

import { useParams } from 'react-router-dom';

import { useAttempt } from '../hooks/useAttempt';

import { useQuestions } from '../../question/hooks/useQuestions';

import { useExam } from '../../exam/hooks/useExam';

import { useAttemptStore } from '../stores/attemptStore';

import QuestionNavigator from '../components/QuestionNavigator';

import ExamTimer from '../components/ExamTimer';

export default function AttemptPage() {
  const { attemptId } = useParams();

  const attemptIdNumber =
    Number(attemptId);

  // ========================================
  // ATTEMPT
  // ========================================

  const {
    data: attempt,
    isLoading: isAttemptLoading,
    isError: isAttemptError,
  } = useAttempt(attemptIdNumber);

  const examId = attempt?.exam;

  // ========================================
  // EXAM
  // ========================================

  const {
    data: exam,
    isLoading: isExamLoading,
    isError: isExamError,
  } = useExam(examId ?? 0);

  // ========================================
  // QUESTIONS
  // ========================================

  const {
    data: questions,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useQuestions(examId ?? 0);

  // ========================================
  // ZUSTAND
  // ========================================

  const currentPage =
    useAttemptStore(
      (state) => state.currentPage
    );

  const currentQuestionIndex =
    useAttemptStore(
      (state) =>
        state.currentQuestionIndex
    );

  const questionsPerPage =
    useAttemptStore(
      (state) =>
        state.questionsPerPage
    );

  const answers =
    useAttemptStore(
      (state) => state.answers
    );

  const markedForReview =
    useAttemptStore(
      (state) =>
        state.markedForReview
    );

  const setAnswer =
    useAttemptStore(
      (state) => state.setAnswer
    );

  // ========================================
  // PAGE NAVIGATION
  // ========================================

  const nextPage =
    useAttemptStore(
      (state) => state.nextPage
    );

  const previousPage =
    useAttemptStore(
      (state) =>
        state.previousPage
    );

  // ========================================
  // REVIEW
  // ========================================

  const toggleMarkForReview =
    useAttemptStore(
      (state) =>
        state.toggleMarkForReview
    );

  // ========================================
  // LOADING ATTEMPT
  // ========================================

  if (isAttemptLoading) {
    return (
      <Typography>
        Memuat data pengerjaan...
      </Typography>
    );
  }

  // ========================================
  // ERROR ATTEMPT
  // ========================================

  if (isAttemptError) {
    return (
      <Typography color="error">
        Gagal mengambil data pengerjaan.
      </Typography>
    );
  }

  // ========================================
  // ATTEMPT NOT FOUND
  // ========================================

  if (!attempt) {
    return (
      <Typography color="error">
        Data pengerjaan tidak ditemukan.
      </Typography>
    );
  }

  // ========================================
  // LOADING EXAM
  // ========================================

  if (isExamLoading) {
    return (
      <Typography>
        Memuat data ujian...
      </Typography>
    );
  }

  // ========================================
  // ERROR EXAM
  // ========================================

  if (isExamError) {
    return (
      <Typography color="error">
        Gagal mengambil data ujian.
      </Typography>
    );
  }

  // ========================================
  // EXAM NOT FOUND
  // ========================================

  if (!exam) {
    return (
      <Typography color="error">
        Data ujian tidak ditemukan.
      </Typography>
    );
  }

  // ========================================
  // LOADING QUESTIONS
  // ========================================

  if (isQuestionsLoading) {
    return (
      <Typography>
        Memuat soal...
      </Typography>
    );
  }

  // ========================================
  // ERROR QUESTIONS
  // ========================================

  if (isQuestionsError) {
    return (
      <Typography color="error">
        Gagal mengambil soal.
      </Typography>
    );
  }

  // ========================================
  // QUESTIONS EMPTY
  // ========================================

  if (
    !questions ||
    questions.length === 0
  ) {
    return (
      <Typography>
        Belum ada soal.
      </Typography>
    );
  }

  // ========================================
  // PAGINATION CALCULATION
  // ========================================

  const totalQuestions =
    questions.length;

  const totalPages =
    Math.ceil(
      totalQuestions /
        questionsPerPage
    );

  const startIndex =
    currentPage *
    questionsPerPage;

  const endIndex =
    startIndex +
    questionsPerPage;

  const currentQuestions =
    questions.slice(
      startIndex,
      endIndex
    );

  // ========================================
  // RENDER
  // ========================================

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,

        display: 'grid',

        gridTemplateColumns: {
          xs: '1fr',
          md: 'minmax(0, 1fr) 280px',
        },

        gridTemplateRows:
          'minmax(0, 1fr)',

        gap: {
          xs: 3,
          md: 4,
        },

        overflow: 'hidden',
      }}
    >

      {/* ================================== */}
      {/* LEFT COLUMN */}
      {/* HEADER + QUESTIONS + FOOTER */}
      {/* ================================== */}

      <Box
        sx={{
          minWidth: 0,
          minHeight: 0,

          display: 'flex',
          flexDirection: 'column',

          overflow: 'hidden',
        }}
      >

        {/* ================================== */}
        {/* HEADER */}
        {/* ================================== */}

        <Box
          sx={{
            flexShrink: 0,

            display: 'flex',
            alignItems: 'center',
            justifyContent:
              'space-between',

            gap: 2,
          }}
        >

          {/* ================================= */}
          {/* TITLE + PAGE */}
          {/* ================================= */}

          <Box>
            <Typography variant="h5">
              Soal Tryout
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              Halaman{' '}
              {currentPage + 1}{' '}
              dari {totalPages}
            </Typography>
          </Box>

          {/* ================================= */}
          {/* EXAM TIMER */}
          {/* ================================= */}

          <ExamTimer
            startedAt={
              attempt.started_at
            }
            durationMinutes={
              exam.duration
            }
          />

        </Box>

        {/* ================================== */}
        {/* QUESTION SCROLL AREA */}
        {/* ================================== */}

        <Box
          sx={{
            flex: 1,

            minWidth: 0,
            minHeight: 0,

            overflowY: 'auto',

            mt: 3,

            pr: {
              xs: 0,
              md: 1,
            },
          }}
        >

          {/* ================================== */}
          {/* QUESTIONS */}
          {/* ================================== */}

          <Box>

            {currentQuestions.map(
              (question) => {

                // ==================================
                // REVIEW STATUS
                // ==================================

                const isQuestionMarked =
                  markedForReview[
                    question.id
                  ] === true;

                // ==================================
                // CURRENT QUESTION
                // ==================================

                const isCurrentQuestion =
                  question.id ===
                  questions[
                    currentQuestionIndex
                  ]?.id;

                return (
                  <Box
                    key={question.id}
                    sx={{
                      mb: 3,
                      p: 3,

                      border:
                        '1px solid',

                      borderColor:
                        isCurrentQuestion
                          ? 'primary.main'
                          : 'divider',

                      backgroundColor:
                        isCurrentQuestion
                          ? 'action.hover'
                          : 'background.paper',

                      borderRadius: 2,

                      transition:
                        'border-color 0.2s ease, background-color 0.2s ease',
                    }}
                  >

                    {/* ================================ */}
                    {/* QUESTION */}
                    {/* ================================ */}

                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                      }}
                    >
                      {question.order}.{' '}
                      {
                        question.question_text
                      }
                    </Typography>

                    {/* ================================ */}
                    {/* ANSWERS */}
                    {/* ================================ */}

                    <RadioGroup
                      value={
                        answers[
                          question.id
                        ] ?? ''
                      }
                      onChange={(event) => {
                        const optionId =
                          Number(
                            event.target.value
                          );

                        setAnswer(
                          question.id,
                          optionId
                        );
                      }}
                      sx={{
                        display: 'grid',

                        gridTemplateColumns: {
                          xs: '1fr',
                          sm: 'repeat(3, 1fr)',
                        },

                        columnGap: 3,
                        rowGap: 1,
                      }}
                    >

                      {question.options.map(
                        (option) => (

                          <FormControlLabel
                            key={option.id}
                            value={
                              option.id
                            }
                            control={
                              <Radio />
                            }
                            label={
                              `${String.fromCharCode(
                                96 +
                                  option.order
                              )}. ${
                                option.option_text
                              }`
                            }
                            sx={{
                              mb: 0,
                              mr: 0,

                              gridColumn: {
                                xs: '1',

                                sm:
                                  option.order ===
                                    1 ||
                                  option.order ===
                                    2
                                    ? '1'
                                    : option.order ===
                                        3 ||
                                      option.order ===
                                        4
                                    ? '2'
                                    : '3',
                              },

                              gridRow: {
                                xs: 'auto',

                                sm:
                                  option.order ===
                                    1 ||
                                  option.order ===
                                    3 ||
                                  option.order ===
                                    5
                                    ? '1'
                                    : '2',
                              },
                            }}
                          />
                        )
                      )}

                    </RadioGroup>

                    {/* ================================ */}
                    {/* MARK FOR REVIEW */}
                    {/* ================================ */}

                    <Box
                      sx={{
                        mt: 2,
                      }}
                    >

                      <Button
                        variant={
                          isQuestionMarked
                            ? 'contained'
                            : 'outlined'
                        }
                        color="warning"
                        onClick={() =>
                          toggleMarkForReview(
                            question.id
                          )
                        }
                      >
                        {isQuestionMarked
                          ? 'Batalkan Ragu-ragu'
                          : 'Tandai Ragu-ragu'}
                      </Button>

                    </Box>

                  </Box>
                );
              }
            )}

          </Box>

        </Box>

        {/* ================================== */}
        {/* FOOTER PAGE NAVIGATION */}
        {/* ================================== */}

        <Box
          component="footer"
          sx={{
            flexShrink: 0,

            borderTop:
              '1px solid',

            borderColor:
              'divider',

            backgroundColor:
              'background.paper',

            px: {
              xs: 1,
              sm: 2,
              md: 3,
            },

            py: 2,

            mt: 1,

            zIndex: 10,
          }}
        >

          <Box
            sx={{
              display: 'flex',

              justifyContent:
                'space-between',

              alignItems: 'center',

              gap: 2,
            }}
          >

            {/* ================================ */}
            {/* PREVIOUS PAGE */}
            {/* ================================ */}

            <Button
              variant="outlined"
              disabled={
                currentPage === 0
              }
              onClick={() =>
                previousPage()
              }
            >
              Sebelumnya
            </Button>

            {/* ================================ */}
            {/* PAGE INFORMATION */}
            {/* ================================ */}

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textAlign: 'center',
              }}
            >
              Halaman{' '}
              {currentPage + 1}{' '}
              dari {totalPages}
            </Typography>

            {/* ================================ */}
            {/* NEXT PAGE */}
            {/* ================================ */}

            <Button
              variant="contained"
              disabled={
                currentPage >=
                totalPages - 1
              }
              onClick={() =>
                nextPage(
                  totalQuestions
                )
              }
            >
              Berikutnya
            </Button>

          </Box>

        </Box>

      </Box>

      {/* ================================== */}
      {/* RIGHT SIDEBAR */}
      {/* ================================== */}

      <Box
        component="aside"
        sx={{
          minWidth: 0,
          minHeight: 0,

          display: 'flex',
          flexDirection: 'column',

          overflow: 'hidden',
        }}
      >

        {/* ================================== */}
        {/* QUESTION NAVIGATOR */}
        {/* ================================== */}

        <QuestionNavigator
          questions={questions.map(
            (question) => ({
              id: question.id,
              order: question.order,
            })
          )}
        />

      </Box>

    </Box>
  );
}