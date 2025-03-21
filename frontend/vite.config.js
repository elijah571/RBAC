export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist',  // Ensure build files go to the parent directory's dist folder
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
