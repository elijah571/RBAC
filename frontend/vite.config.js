import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  server: {
    // Set the development server to run on port 3000
    host: 'localhost',  // Optional, allows access from other devices on the network
    port: 3000,         // Set port to 3000
    strictPort: true,   // If the port is already in use, it will fail
  },
};
