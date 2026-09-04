
import {
  Box,
  Typography,
  Stack,
  Divider,
  Chip,
} from '@mui/material';

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

import PageHeader from '../../../components/ui/PageHeader';
import LoadingState from '../../../components/ui/LoadingState';
import ErrorState from '../../../components/ui/ErrorState';
import GirasButton from '../../../components/ui/GirasButton';
import GirasCard from '../../../components/ui/GirasCard';

import { useExam } from '../hooks/useExam';
import { useStartAttempt } from '../../attempt/hooks/useStartAttempts';

export default function ExamDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const examId = Number(id);

  // Mengambil detail exam
  const {
    data: exam,
    isLoading,
    isError,
  } = useExam(examId);

  // Mutation untuk membuat Attempt baru
  const startAttemptMutation = useStartAttempt();

  if (isLoading) {
    return (
      <LoadingState
        message="Memuat detail tryout..."
      />
    );
  }

  if (isError || !exam) {
    return (
      <ErrorState
        message="Gagal mengambil detail tryout."
      />
    );
  }

  return (
    <Box>
      <PageHeader
        title={exam.title}
        description="Detail tryout yang akan kamu kerjakan."
      />

      <GirasCard
        sx={{
          p: 3,
          mt: 3,
        }}
      >
        <Stack spacing={3}>

          {/* Informasi Tryout */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
              }}
            >
              Informasi Tryout
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Berikut informasi mengenai tryout yang
              akan kamu kerjakan.
            </Typography>
          </Box>

          <Divider />

          {/* Durasi dan Status */}
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={2}
          >

            {/* Durasi */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Durasi
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mt: 0.5,
                }}
              >
                {exam.duration} menit
              </Typography>
            </Box>

            {/* Status */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Status
              </Typography>

              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label={
                    exam.is_active
                      ? 'Aktif'
                      : 'Tidak Aktif'
                  }
                  color={
                    exam.is_active
                      ? 'success'
                      : 'default'
                  }
                  size="small"
                />
              </Box>
            </Box>

          </Stack>

          <Divider />

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >

            {/* Kembali */}
            <GirasButton
              component={Link}
              to="/exams"
              variant="outlined"
            >
              Kembali
            </GirasButton>

            {/* Mulai Tryout */}
            <GirasButton
              variant="contained"
              disabled={
                !exam.is_active ||
                startAttemptMutation.isPending
              }
              onClick={() => {
                startAttemptMutation.mutate(
                  exam.id,
                  {
                    onSuccess: (attempt) => {
                      console.log(
                        'Attempt berhasil dibuat:',
                        attempt
                      );

                      navigate(
                        `/attempts/${attempt.id}`
                      );
                    },

                    onError: (error) => {
                      console.error(
                        'Gagal membuat attempt:',
                        error
                      );
                    },
                  }
                );
              }}
            >
              {startAttemptMutation.isPending
                ? 'Memulai...'
                : 'Mulai Tryout'}
            </GirasButton>

          </Box>

        </Stack>
      </GirasCard>
    </Box>
  );
}

