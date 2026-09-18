import { useState } from 'react';

import {
  Box,
  Button,
  Typography,
} from '@mui/material';

import { useAttemptStore } from '../stores/attemptStore';

interface QuestionNavigatorProps {
  questions: {
    id: number;
    order: number;
  }[];
}

export default function QuestionNavigator({
  questions,
}: QuestionNavigatorProps) {
  // ========================================
  // LOCAL STATE — SUMMARY VIEW TOGGLE
  // ========================================

  const [showSummary, setShowSummary] =
    useState(false);

  // ========================================
  // ZUSTAND
  // ========================================

  const currentQuestionIndex =
    useAttemptStore(
      (state) =>
        state.currentQuestionIndex
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

  const goToQuestion =
    useAttemptStore(
      (state) =>
        state.goToQuestion
    );

  const getAnsweredCount =
    useAttemptStore(
      (state) =>
        state.getAnsweredCount
    );

  const getMarkedForReviewCount =
    useAttemptStore(
      (state) =>
        state.getMarkedForReviewCount
    );

  // ========================================
  // QUESTION CLICK
  // ========================================

  const handleQuestionClick = (
    questionIndex: number
  ) => {
    goToQuestion(questionIndex);
  };

  // ========================================
  // SUMMARY CALCULATION
  // ========================================

  const totalQuestions =
    questions.length;

  const answeredCount =
    getAnsweredCount();

  const markedForReviewCount =
    getMarkedForReviewCount();

  const unansweredCount =
    totalQuestions -
    answeredCount;

  // ========================================
  // FINISH BUTTON CLICK
  // ========================================

  const handleFinishClick = () => {
    setShowSummary(true);
  };

  // ========================================
  // CANCEL BUTTON CLICK
  // ========================================

  const handleCancelClick = () => {
    setShowSummary(false);
  };

  // ========================================
  // SUBMIT BUTTON CLICK
  // ========================================

  const handleSubmitClick = () => {
    // TODO: tambahkan logika submit ujian ke server di sini
    console.log('Ujian selesai dikirim!');
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 0,

        display: 'flex',
        flexDirection: 'column',

        p: 0,
        m: 0,
      }}
    >

      {/* ================================== */}
      {/* TITLE (FIXED) */}
      {/* ================================== */}

      <Typography
        variant="subtitle2"
        sx={{
          mb: 1,
          fontWeight: 600,
          mt: 0,
          flexShrink: 0,
        }}
      >
        {showSummary
          ? 'Ringkasan Pengerjaan'
          : 'Navigator Soal'}
      </Typography>

      {/* ==================================================== */}
      {/* ==================================================== */}
      {/* MODE: SUMMARY */}
      {/* ==================================================== */}
      {/* ==================================================== */}

      {showSummary ? (

        <Box
          sx={{
            flex: 1,
            minHeight: 0,

            display: 'flex',
            flexDirection: 'column',

            justifyContent: 'center',
          }}
        >

          {/* ================================== */}
          {/* SUMMARY LIST */}
          {/* ================================== */}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >

            {/* ================================== */}
            {/* ANSWERED */}
            {/* ================================== */}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  'space-between',

                p: 1.5,

                borderRadius: 1,

                bgcolor:
                  'success.main',

                color: '#fff',
              }}
            >
              <Typography
                variant="body2"
              >
                Sudah dijawab
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                }}
              >
                {answeredCount} / {totalQuestions}
              </Typography>
            </Box>

            {/* ================================== */}
            {/* MARKED FOR REVIEW */}
            {/* ================================== */}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  'space-between',

                p: 1.5,

                borderRadius: 1,

                bgcolor:
                  'warning.main',

                color: '#fff',
              }}
            >
              <Typography
                variant="body2"
              >
                Ragu-ragu
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                }}
              >
                {markedForReviewCount} / {totalQuestions}
              </Typography>
            </Box>

            {/* ================================== */}
            {/* UNANSWERED */}
            {/* ================================== */}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  'space-between',

                p: 1.5,

                borderRadius: 1,

                border: '1px solid',
                borderColor:
                  'text.disabled',
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Belum dijawab
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                }}
              >
                {unansweredCount} / {totalQuestions}
              </Typography>
            </Box>

            {/* ================================== */}
            {/* TOTAL */}
            {/* ================================== */}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  'space-between',

                p: 1.5,

                borderRadius: 1,

                bgcolor:
                  'action.hover',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                }}
              >
                Total Soal
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                }}
              >
                {totalQuestions}
              </Typography>
            </Box>

          </Box>

        </Box>

      ) : (

      /* ==================================================== */
      /* ==================================================== */
      /* MODE: NAVIGATOR (DEFAULT) */
      /* ==================================================== */
      /* ==================================================== */

        <>

          {/* ================================== */}
          {/* QUESTION BUTTONS (SCROLLABLE) */}
          {/* ================================== */}

          <Box
            sx={{
              flex: 1,
              minHeight: 0,

              overflowY: 'auto',

              pr: 0.5,

              display: 'grid',

              /*
               * Tetap 5 button
               * dalam 1 baris.
               */
              gridTemplateColumns:
                'repeat(5, 1fr)',

              gap: 1,

              alignContent: 'start',
            }}
          >
            {questions.map(
              (question, index) => {

                // ==================================
                // CURRENT QUESTION
                // ==================================

                const isCurrentQuestion =
                  index ===
                  currentQuestionIndex;

                // ==================================
                // ANSWERED STATUS
                // ==================================

                const isAnswered =
                  answers[
                    question.id
                  ] !== undefined;

                // ==================================
                // REVIEW STATUS
                // ==================================

                const isMarkedForReview =
                  markedForReview[
                    question.id
                  ] === true;

                // ==================================
                // BUTTON VARIANT
                // ==================================

                const buttonVariant =
                  isCurrentQuestion
                    ? 'contained'
                    : 'outlined';

                // ==================================
                // BUTTON COLOR
                // ==================================

                let buttonColor:
                  | 'primary'
                  | 'warning'
                  | 'success'
                  | 'inherit';

                /*
                 * Priority:
                 *
                 * Current
                 * ↓
                 * Review
                 * ↓
                 * Answered
                 * ↓
                 * Unanswered
                 */

                if (
                  isCurrentQuestion
                ) {
                  buttonColor =
                    'primary';
                } else if (
                  isMarkedForReview
                ) {
                  buttonColor =
                    'warning';
                } else if (
                  isAnswered
                ) {
                  buttonColor =
                    'success';
                } else {
                  buttonColor =
                    'inherit';
                }

                return (
                  <Button
                    key={question.id}
                    variant={
                      buttonVariant
                    }
                    color={
                      buttonColor
                    }
                    onClick={() =>
                      handleQuestionClick(
                        index
                      )
                    }
                    sx={{
                      minWidth: 45,
                      height: 45,
                      fontWeight: 600,
                    }}
                  >
                    {question.order}
                  </Button>
                );
              }
            )}
          </Box>

          {/* ================================== */}
          {/* BAGIAN BAWAH (FIXED — TIDAK IKUT SCROLL) */}
          {/* Legend + Info + Tombol SELESAI */}
          {/* ================================== */}

          <Box
            sx={{
              flexShrink: 0,
            }}
          >

            {/* ================================== */}
            {/* LEGEND */}
            {/* ================================== */}

            <Box
              sx={{
                mt: 2,

                display: 'grid',
                gridTemplateColumns:
                  'repeat(2, minmax(0, 1fr))',

                columnGap: 2,
                rowGap: 1.25,
              }}
            >

              {/* ================================== */}
              {/* ANSWERED */}
              {/* ================================== */}

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 16,
                    height: 16,
                    borderRadius: 1,
                    bgcolor:
                      'success.main',
                  }}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Sudah dijawab
                </Typography>
              </Box>

              {/* ================================== */}
              {/* CURRENT */}
              {/* ================================== */}

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 16,
                    height: 16,
                    borderRadius: 1,
                    bgcolor:
                      'primary.main',
                  }}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Soal aktif
                </Typography>
              </Box>

              {/* ================================== */}
              {/* UNANSWERED */}
              {/* ================================== */}

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 16,
                    height: 16,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor:
                      'text.disabled',
                  }}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Belum dijawab
                </Typography>
              </Box>

              {/* ================================== */}
              {/* REVIEW */}
              {/* ================================== */}

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 16,
                    height: 16,
                    borderRadius: 1,
                    bgcolor:
                      'warning.main',
                  }}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Ragu-ragu
                </Typography>
              </Box>

            </Box>

            {/* ================================== */}
            {/* INFORMATION */}
            {/* ================================== */}

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 2,
              }}
            >
              Soal{' '}
              {currentQuestionIndex + 1}{' '}
              dari {questions.length}
            </Typography>

            {/* ================================== */}
            {/* SELESAI BUTTON */}
            {/* ================================== */}

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 8,
                  py: 2,
                  fontWeight: 600,
                  borderRadius: 1,
                  textTransform: 'uppercase',
                  background: 'linear-gradient(to bottom, #448AFF, #0D47A1)',
                  color: '#fff',
                  boxShadow: '0 4px 10px rgba(13, 71, 161, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(to bottom, #2979FF, #0D47A1)',
                  },
                }}
                onClick={handleFinishClick}
              >
                SELESAI
              </Button>
            </Box>

          </Box>

        </>

      )}

      {/* ==================================================== */}
      {/* CANCEL & SUBMIT BUTTON (HANYA MUNCUL DI MODE SUMMARY) */}
      {/* ==================================================== */}

      {showSummary && (

        <Box
          sx={{
            flexShrink: 0,

            mt: 3,

            display: 'flex',
            gap: 1.5,
          }}
        >

          {/* ================================== */}
          {/* CANCEL */}
          {/* ================================== */}

          <Button
            variant="outlined"
            fullWidth
            sx={{
              fontWeight: 600,
              py: 1.2,
            }}
            onClick={handleCancelClick}
          >
            Batal
          </Button>

          {/* ================================== */}
          {/* SUBMIT */}
          {/* ================================== */}

          <Button
            variant="contained"
            fullWidth
            sx={{
              fontWeight: 600,
              py: 1.2,
              background: 'linear-gradient(to bottom, #448AFF, #0D47A1)',
              color: '#fff',
              boxShadow: '0 4px 10px rgba(13, 71, 161, 0.3)',
              '&:hover': {
                background: 'linear-gradient(to bottom, #2979FF, #0D47A1)',
              },
            }}
            onClick={handleSubmitClick}
          >
            Submit
          </Button>

        </Box>

      )}

    </Box>
  );
}