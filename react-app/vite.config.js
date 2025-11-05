import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    IP_NETWORK: JSON.stringify('https://employee-attendance-app-wt3x.onrender.com'),
  }
});
