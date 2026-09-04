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

export default function AttemptPage() {
  const { attemptId } = useParams();

  const attemptIdNumber = Number(attemptId);

  const {
    data: attempt,
    isLoading: isAttemptLoading,
    isError: isAttemptError,
  } = useAttempt(attemptIdNumber);

  const examId = attempt?.exam;

  const {
    data: questions,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useQuestions(examId ?? 0);

  // ========================================
  // ZUSTAND
  // ========================================

  const currentQuestionIndex =
    useAttemptStore(
      (state) => state.currentQuestionIndex
    );

  const answers =
    useAttemptStore(
      (state) => state.answers
    );

  const setAnswer =
    useAttemptStore(
      (state) => state.setAnswer
    );

  const setCurrentQuestionIndex =
    useAttemptStore(
      (state) => state.setCurrentQuestionIndex
    );

  const nextQuestion =
    useAttemptStore(
      (state) => state.nextQuestion
    );

  const previousQuestion =
    useAttemptStore(
      (state) => state.previousQuestion
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
  // ATTEMPT TIDAK DITEMUKAN
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
  // QUESTIONS KOSONG
  // ========================================

  if (!questions || questions.length === 0) {
    return (
      <Typography>
        Belum ada soal.
      </Typography>
    );
  }

  // ========================================
  // CURRENT QUESTION
  // ========================================

  const currentQuestion =
    questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <Typography color="error">
        Soal tidak ditemukan.
      </Typography>
    );
  }

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
        Soal {currentQuestionIndex + 1} dari{' '}
        {questions.length}
      </Typography>

      {/* ================================== */}
      {/* QUESTION CARD */}
      {/* ================================== */}

      <Box
        sx={{
          mt: 3,
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
          {currentQuestion.order}.{' '}
          {currentQuestion.question_text}
        </Typography>

        {/* ================================== */}
        {/* ANSWERS */}
        {/* ================================== */}

        <RadioGroup
          value={
            answers[currentQuestion.id] ?? ''
          }
          onChange={(event) => {
            const optionId = Number(
              event.target.value
            );

            setAnswer(
              currentQuestion.id,
              optionId
            );
          }}
        >
          {currentQuestion.options.map(
            (option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={<Radio />}
                label={
                  `${option.order}. ${option.option_text}`
                }
                sx={{
                  mb: 1,
                }}
              />
            )
          )}
        </RadioGroup>

      </Box>

      {/* ================================== */}
      {/* PREVIOUS / NEXT */}
      {/* ================================== */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
        }}
      >

        <Button
          variant="outlined"
          disabled={
            currentQuestionIndex === 0
          }
          onClick={() =>
            previousQuestion()
          }
        >
          Sebelumnya
        </Button>

        <Button
          variant="contained"
          disabled={
            currentQuestionIndex ===
            questions.length - 1
          }
          onClick={() =>
            nextQuestion(questions.length)
          }
        >
          Berikutnya
        </Button>

      </Box>

      {/* ================================== */}
      {/* QUESTION NAVIGATION */}
      {/* ================================== */}

      <Box sx={{ mt: 4 }}>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Nomor Soal
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {questions.map(
            (question, index) => {

              const isCurrent =
                index ===
                currentQuestionIndex;

              // const isAnswered = answers[question.id] !== undefined;

              return (
                <Button
                  key={question.id}
                  variant={
                    isCurrent
                      ? 'contained'
                      : 'outlined'
                  }
                  onClick={() =>
                    setCurrentQuestionIndex(
                      index
                    )
                  }
                  sx={{
                    minWidth: 44,
                    height: 44,
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </Button>
              );
            }
          )}
        </Box>

      </Box>

    </Box>
  );
}