import {
  Box,
  Typography,
} from '@mui/material';

import { useExamTimer } from '../hooks/useExamTimer';

interface ExamTimerProps {
  startedAt: string | null;
  durationMinutes: number;
}

export default function ExamTimer({
  startedAt,
  durationMinutes,
}: ExamTimerProps) {
  const {
    remainingSeconds,
    formattedTime,
    isExpired,
  } = useExamTimer({
    startedAt,
    durationMinutes,
  });

  // ========================================
  // TIMER STATUS
  // ========================================

  const isCritical =
    remainingSeconds > 0 &&
    remainingSeconds <= 60;

  const isDanger =
    remainingSeconds > 60 &&
    remainingSeconds <= 5 * 60;

  const isWarning =
    remainingSeconds > 5 * 60 &&
    remainingSeconds <= 10 * 60;

  // ========================================
  // TIMER COLOR
  // ========================================

  let timerColor:
    | 'text.primary'
    | 'warning.main'
    | 'error.main';

  if (isDanger || isCritical || isExpired) {
    timerColor =
      'error.main';
  } else if (isWarning) {
    timerColor =
      'warning.main';
  } else {
    timerColor =
      'text.primary';
  }

  // ========================================
  // TIMER LABEL
  // ========================================

  let timerLabel =
    'Sisa waktu';

  if (isExpired) {
    timerLabel =
      'Waktu habis';
  } else if (isCritical) {
    timerLabel =
      'Segera selesai';
  } else if (isDanger) {
    timerLabel =
      'Waktu hampir habis';
  } else if (isWarning) {
    timerLabel =
      'Perhatikan waktu';
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
      }}
    >

      {/* ================================== */}
      {/* LABEL */}
      {/* ================================== */}

      <Typography
        variant="body2"
        color="text.secondary"
      >
        {timerLabel}
      </Typography>

      {/* ================================== */}
      {/* COUNTDOWN */}
      {/* ================================== */}

      <Typography
        variant="h6"
        
        sx={{
            fontWeight:700,
          fontVariantNumeric:
            'tabular-nums',

          color:
            timerColor,

          minWidth: 88,

          textAlign: 'right',

          /*
           * Animasi hanya ketika
           * waktu tersisa <= 1 menit.
           */
          ...(isCritical && {
            animation:
              'girasTimerBlink 1s ease-in-out infinite',

            '@keyframes girasTimerBlink': {
              '0%, 100%': {
                opacity: 1,
              },

              '50%': {
                opacity: 0.35,
              },
            },
          }),
        }}
      >
        {formattedTime}
      </Typography>

    </Box>
  );
}