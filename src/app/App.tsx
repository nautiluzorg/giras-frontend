import ThemeProvider from './providers/ThemeProvider';
import { QueryProvider } from './providers/QueryProvider';
import { AppRouter } from './router';

export default function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ThemeProvider>
  );
}