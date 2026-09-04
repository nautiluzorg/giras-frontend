import {
  Box,
  Paper,
  Typography,
} from '@mui/material';

interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 5,
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}