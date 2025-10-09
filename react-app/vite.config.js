import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  server: {
    proxy: {
      '/ws': {
        target: 'ws://192.168.1.6:5555',
        ws: true
      }
    }
  }
}
