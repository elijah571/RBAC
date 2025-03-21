import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export Vite config with defineConfig function
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist', // Ensure build files go to the parent directory's dist folder
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api/': {
        target: 'http://localhost:3000', // Proxy requests to your backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
