//vite.config.ts
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],

//   // KHÔNG server.proxy
//   // KHÔNG allowedHosts
//   // KHÔNG host / port

//   define: {
//     IP_NETWORK: JSON.stringify('/api'),
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    plugins: [react()],

    server: {
      host: '0.0.0.0',
      port: 5173,

      allowedHosts: [
        'vinhnub.local',
      ],

      proxy: {
        '/api': {
          target: 'http://localhost:5555',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    define: {
      IP_NETWORK: JSON.stringify('/api'),
    },
  }
})
