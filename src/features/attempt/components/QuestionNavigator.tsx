import { Box, Button, Typography } from '@mui/material';

import { useAttemptStore } from '../stores/attemptStore';

interface QuestionNavigatorProps {
  totalQuestions: number;
}

export default function QuestionNavigator({
  totalQuestions,
}: QuestionNavigatorProps) {
  const currentPage =
    useAttemptStore(
      (state) => state.currentPage
    );

  const questionsPerPage =
    useAttemptStore(
      (state) => state.questionsPerPage
    );

  const setCurrentPage =
    useAttemptStore(
      (state) => state.setCurrentPage
    );

  const totalPages =
    Math.ceil(
      totalQuestions /
        questionsPerPage
    );

  const handleQuestionClick = (
    questionNumber: number
  ) => {
    const questionIndex =
      questionNumber - 1;

    const targetPage =
      Math.floor(
        questionIndex /
          questionsPerPage
      );

    setCurrentPage(targetPage);
  };

  return (
    <Box>
      <Typography
        variant="subtitle1"
        sx={{ mb: 2 }}
      >
        Navigator Soal
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(5, 1fr)',
          gap: 1,
        }}
      >
        {Array.from(
          {
            length: totalQuestions,
          },
          (_, index) => {
            const questionNumber =
              index + 1;

            const questionIndex =
              questionNumber - 1;

            const questionPage =
              Math.floor(
                questionIndex /
                  questionsPerPage
              );

            const isCurrentPage =
              questionPage ===
              currentPage;

            return (
              <Button
                key={questionNumber}
                variant={
                  isCurrentPage
                    ? 'contained'
                    : 'outlined'
                }
                onClick={() =>
                  handleQuestionClick(
                    questionNumber
                  )
                }
              >
                {questionNumber}
              </Button>
            );
          }
        )}
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        Halaman {currentPage + 1} dari{' '}
        {totalPages}
      </Typography>
    </Box>
  );
}