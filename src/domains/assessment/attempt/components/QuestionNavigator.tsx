

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

  // ========================================
  // QUESTION CLICK
  // ========================================

  const handleQuestionClick = (
    questionIndex: number
  ) => {
    goToQuestion(questionIndex);
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <Box
      sx={{
        /*
         * Tidak ada padding/margin
         * tambahan di bagian atas.
         */
        p: 0,
        m: 0,
      }}
    >

      {/* ================================== */}
      {/* TITLE */}
      {/* ================================== */}

      <Typography
        variant="subtitle2"
        sx={{
          mb: 1,
          fontWeight: 600,
          mt: 0,
        }}
      >
        Navigator Soal
      </Typography>

      {/* ================================== */}
      {/* QUESTION BUTTONS */}
      {/* ================================== */}

      <Box
        sx={{
          display: 'grid',

          /*
           * Tetap 5 button
           * dalam 1 baris.
           */
          gridTemplateColumns:
            'repeat(5, 1fr)',

          gap: 1,
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
      {/* LEGEND */}
      {/* ================================== */}

      <Box
        sx={{
          /*
           * Tetap dekat dengan
           * navigator.
           */
          mt: 2,

          /*
           * 2 kolom.
           */
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
      px: 8, // lebih lebar
      py: 2, // lebih tinggi
      fontWeight: 600,
      borderRadius: 1, // radius 5 sesuai permintaan
      textTransform: 'uppercase',
      background: 'linear-gradient(to bottom, #448AFF, #0D47A1)', // gradient biru elegan
      color: '#fff',
      boxShadow: '0 4px 10px rgba(13, 71, 161, 0.3)',
      '&:hover': {
        background: 'linear-gradient(to bottom, #2979FF, #0D47A1)', // hover lebih gelap
      },
    }}
    onClick={() => {
      // TODO: tambahkan logika submit ujian di sini
      console.log('Ujian selesai dikirim!');
    }}
  >
    SELESAI
  </Button>
</Box>































    </Box>
  );
}