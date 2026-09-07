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


import { useAttemptStore } from '../stores/attemptStore';

import QuestionNavigator from '../components/QuestionNavigator';

export default function AttemptPage() {
  const { attemptId } = useParams();

  const attemptIdNumber = Number(attemptId);

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

  const questionsPerPage =
    useAttemptStore(
      (state) => state.questionsPerPage
    );

  const answers =
    useAttemptStore(
      (state) => state.answers
    );

  const setAnswer =
    useAttemptStore(
      (state) => state.setAnswer
    );

  const nextPage =
    useAttemptStore(
      (state) => state.nextPage
    );

  const previousPage =
    useAttemptStore(
      (state) => state.previousPage
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
    <Box>

      {/* ================================== */}
      {/* HEADER */}
      {/* ================================== */}

      <Typography variant="h5">
        Soal Tryout
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        Halaman {currentPage + 1} dari{' '}
        {totalPages}
      </Typography>

      {/* ================================== */}
      {/* QUESTIONS */}
      {/* ================================== */}

      <Box sx={{ mt: 3 }}>

        {currentQuestions.map(
          (question) => (
            <Box
              key={question.id}
              sx={{
                mb: 3,
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >

              {/* QUESTION */}

              <Typography
                variant="h6"
                sx={{ mb: 3 }}
              >
                {question.order}.{' '}
                {question.question_text}
              </Typography>

              {/* ANSWERS */}

              <RadioGroup
                value={
                  answers[question.id] ??
                  ''
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
              >
                {question.options.map(
                  (option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.id}
                      control={<Radio />}
                      label={
                          `${String.fromCharCode(
                            96 + option.order
                          )}. ${option.option_text}`
                        }
                      sx={{
                        mb: 1,
                      }}
                    />
                  )
                )}
              </RadioGroup>

            </Box>
          )
        )}

      </Box>

      {/* ================================== */}
      {/* PAGINATION BUTTON */}
      {/* ================================== */}

      <Box
        sx={{
          display: 'flex',
          justifyContent:
            'space-between',
          mt: 3,
        }}
      >

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

        <Button
          variant="contained"
          disabled={
            currentPage ===
            totalPages - 1
          }
          onClick={() =>
            nextPage(totalQuestions)
          }
        >
          Berikutnya
        </Button>

      </Box>

      {/* ================================== */}
      {/* PAGE INFORMATION */}
      {/* ================================== */}

      <Box
        sx={{
          mt: 3,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Soal {startIndex + 1} -{' '}
          {Math.min(
            endIndex,
            totalQuestions
          )}{' '}
          dari {totalQuestions}
        </Typography>
      </Box>

      {/* ================================== */}
      {/* QUESTION NAVIGATOR */}
      {/* ================================== */}

      <Box
        sx={{
          mt: 4,
        }}
      >
        <QuestionNavigator
          totalQuestions={totalQuestions}
        />
      </Box>
    </Box>
  );
}