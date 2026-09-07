import { Box } from '@mui/material';

import PageHeader from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';

import ExamCard from '../components/ExamCard';
import { useExams } from '../hooks/useExams';

export default function ExamListPage() {
  const {
    data: exams,
    isLoading,
    isError,
  } = useExams();

  return (
    <Box>
      <PageHeader
        title="Daftar Tryout"
        description="Pilih tryout yang ingin kamu kerjakan."
      />

      {isLoading && (
        <LoadingState
          message="Memuat daftar tryout..."
        />
      )}

      {isError && (
        <ErrorState
          message="Gagal mengambil daftar tryout."
        />
      )}

      {!isLoading &&
        !isError &&
        (!exams || exams.length === 0) && (
          <EmptyState
            title="Belum ada tryout"
            description="Belum tersedia tryout yang dapat dikerjakan."
          />
        )}

      {!isLoading &&
        !isError &&
        exams &&
        exams.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 2,
            }}
          >
            {exams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onStart={(selectedExam) => {
                  console.log(
                    'Mulai tryout:',
                    selectedExam
                  );
                }}
              />
            ))}
          </Box>
        )}
    </Box>
  );
}