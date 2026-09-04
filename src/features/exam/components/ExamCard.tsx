import {
  Box,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';

import GirasButton from '../../../components/ui/GirasButton';
import GirasCard from '../../../components/ui/GirasCard';

import type { Exam } from '../types/exam.types';

interface ExamCardProps {
  exam: Exam;
  onStart?: (exam: Exam) => void;
}

export default function ExamCard({
  exam,
  onStart,
}: ExamCardProps) {
  return (
    <GirasCard
      sx={{
        p: 2.5,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
        }}
      >
        {exam.title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 0.5,
        }}
      >
        Durasi: {exam.duration} menit
      </Typography>

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          gap: 1,
        }}
      >
        <GirasButton
          component={Link}
          to={`/exams/${exam.id}`}
          variant="outlined"
        >
          Detail
        </GirasButton>

        <GirasButton
          variant="contained"
          onClick={() => onStart?.(exam)}
        >
          Tryout
        </GirasButton>
      </Box>
    </GirasCard>
  );
}