import axios from 'axios';

/** Typed, opt-in helpers for presenting API failures without changing transport behaviour. */
export function getApiErrorMessage(error: unknown): string | undefined {
  if (!axios.isAxiosError(error)) {
    return undefined;
  }

  const data = error.response?.data;

  if (
    data &&
    typeof data === 'object' &&
    'message' in data &&
    typeof data.message === 'string'
  ) {
    return data.message;
  }

  return error.message || undefined;
}
