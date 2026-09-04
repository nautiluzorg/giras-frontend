import { CssBaseline } from '@mui/material';
import {
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import type { ReactNode } from 'react';

import { girasTheme } from '../../theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({
  children,
}: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={girasTheme}>
      <CssBaseline />

      {children}
    </MuiThemeProvider>
  );
}