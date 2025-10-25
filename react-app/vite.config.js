import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    IP_NETWORK: JSON.stringify('26.253.176.29'),
    PORT: JSON.stringify('5555'),
  },
});
