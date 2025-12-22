import { defineConfig,loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode,process.cwd(),'');
  return {
    plugins: [react()],
    define: {
      IP_NETWORK: JSON.stringify("http://192.168.1.5:5555"),
    },
  };
  
});

