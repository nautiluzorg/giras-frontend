import {
  Card,
  type CardProps,
} from '@mui/material';

export default function GirasCard(props: CardProps) {
  return (
    <Card
      {...props}
      elevation={0}
    />
  );
}