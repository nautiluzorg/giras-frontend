import {
  Alert,
  AlertTitle,
  Box,
} from '@mui/material';

interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = 'Terjadi kesalahan.',
}: ErrorStateProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Alert severity="error">
        <AlertTitle>
          Gagal Memuat Data
        </AlertTitle>

        {message}
      </Alert>
    </Box>
  );
}