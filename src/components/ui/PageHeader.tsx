import {
  Box,
  Typography,
} from '@mui/material';

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        
        sx={{ fontWeight:700 }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}