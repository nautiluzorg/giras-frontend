import {
  Box,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = 'Memuat data...',
}: LoadingStateProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>

        <Skeleton
          variant="text"
          width="40%"
          height={40}
        />

        <Skeleton
          variant="rounded"
          width="100%"
          height={100}
        />

        <Skeleton
          variant="rounded"
          width="100%"
          height={100}
        />

        <Skeleton
          variant="rounded"
          width="100%"
          height={100}
        />

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {message}
        </Typography>

      </Stack>
    </Box>
  );
}