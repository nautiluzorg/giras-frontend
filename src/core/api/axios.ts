import axios from 'axios';

import { env } from '@/app/config/env';

/** Shared HTTP transport. Domain modules own their endpoints and payloads. */
const api = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
